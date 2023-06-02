<?php

/**
 * @copyright Copyright (c) 2023 Vitor Mattos <vitor@php.rio>
 *
 * @author Vitor Mattos <vitor@php.rio>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

declare(strict_types=1);

namespace OCA\Libresign\Service\IdentifyMethod;

use OCA\Libresign\AppInfo\Application;
use OCA\Libresign\Db\IdentifyMethod;
use OCA\Libresign\Db\IdentifyMethodMapper;
use OCP\IConfig;
use OCP\IUser;

abstract class AbstractIdentifyMethod implements IIdentifyMethod {
	protected IdentifyMethod $entity;
	protected string $name;
	protected array $customConfig = [];
	public function __construct(
		private IdentifyMethodMapper $identifyMethodMapper,
		private IConfig $config
	) {
		$this->entity = new IdentifyMethod();
		$className = (new \ReflectionClass($this))->getShortName();
		$this->name = lcfirst($className);
		$this->entity->setIdentifierKey($this->name);
	}

	public function setEntity(IdentifyMethod $entity): void {
		$this->entity = $entity;
	}

	public function getEntity(): IdentifyMethod {
		return $this->entity;
	}

	public function notify(bool $isNew): void {
	}

	public function validateToRequest(): void {
	}

	public function validateToCreateAccount(string $value): void {
	}

	public function validateToSign(?IUser $user = null): void {
	}

	protected function getSettingsFromDatabase(array $default = [], array $immutable = []): array {
		if ($this->customConfig) {
			return $this->customConfig;
		}
		$default = array_merge(
			[
				'name' => $this->name,
				'enabled' => true,
				'mandatory' => true,
				'can_be_used' => true,
			],
			$default
		);
		$customConfig = $this->getSavedSettings();
		$customConfig = $this->removeKeysThatDontExists($customConfig, $default);
		$customConfig = $this->overrideImmutable($customConfig, $immutable);
		$customConfig = $this->getDefaultValues($customConfig, $default);
		$this->customConfig = $customConfig;
		return $this->customConfig;
	}

	private function overrideImmutable(array $customConfig, array $immutable) {
		return array_merge($customConfig, $immutable);
	}

	private function getSavedSettings(): array {
		$config = $this->config->getAppValue(Application::APP_ID, 'identify_methods', '[]');
		$config = json_decode($config, true);
		if (json_last_error() !== JSON_ERROR_NONE || !is_array($config)) {
			return [];
		}
		$current = array_reduce($config, function ($carry, $config) {
			if ($config['name'] === $this->name) {
				return $config;
			}
			return $carry;
		}, []);
		return $current;
	}

	private function getDefaultValues(array $customConfig, array $default): array {
		foreach ($default as $key => $value) {
			if (!isset($customConfig[$key]) || gettype($value) !== gettype($customConfig[$key])) {
				$customConfig[$key] = $value;
			}
		}
		return $customConfig;
	}

	private function removeKeysThatDontExists(array $customConfig, array $default): array {
		$diff = array_diff_key($customConfig, $default);
		foreach (array_keys($diff) as $invalidKey) {
			unset($customConfig[$invalidKey]);
		}
		return $customConfig;
	}

	public function save(): void {
		if ($this->getEntity()->getId()) {
			$this->identifyMethodMapper->update($this->getEntity());
			$this->notify(false);
		} else {
			$this->identifyMethodMapper->insert($this->getEntity());
			$this->notify(true);
		}
	}
}
