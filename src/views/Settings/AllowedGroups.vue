<!--
  - SPDX-FileCopyrightText: 2021 LibreCode coop and LibreCode contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection :name="name" :description="description">
		<NcSelect :key="idKey"
			v-model="groupsSelected"
			label="displayname"
			:no-wrap="false"
			:aria-label-combobox="description"
			:close-on-select="false"
			:disabled="loadingGroups"
			:loading="loadingGroups"
			:multiple="true"
			:options="groups"
			:searchable="true"
			:show-no-options="false"
			@search-change="searchGroup"
			@input="saveGroups" />
	</NcSettingsSection>
</template>

<script>
import axios from '@nextcloud/axios'
import { translate as t } from '@nextcloud/l10n'
import { confirmPassword } from '@nextcloud/password-confirmation'
import { generateOcsUrl } from '@nextcloud/router'

import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'

import '@nextcloud/password-confirmation/dist/style.css'

export default {
	name: 'AllowedGroups',
	components: {
		NcSettingsSection,
		NcSelect,
	},

	data: () => ({
		name: t('libresign', 'Allow request to sign'),
		description: t('libresign', 'Select authorized groups that can request to sign documents. Admin group is the default group and don\'t need to be defined.'),
		groupsSelected: [],
		groups: [],
		loadingGroups: false,
		idKey: 0,
	}),

	mounted() {
		this.searchGroup('')
		this.getData()
	},

	methods: {
		async getData() {
			this.loadingGroups = true
			const response = await axios.get(
				generateOcsUrl('/apps/provisioning_api/api/v1/config/apps/libresign/groups_request_sign'),
			)
			if (response.data.ocs.data.data !== '') {
				const groupsSelected = JSON.parse(response.data.ocs.data.data)
				this.groupsSelected = this.groups.filter(group => {
					return groupsSelected.indexOf(group.id) !== -1
				})
			}
			this.loadingGroups = false
		},

		async saveGroups() {
			await confirmPassword()

			const listOfInputGroupsSelected = JSON.stringify(this.groupsSelected.map((g) => {
				if (typeof g === 'object') {
					return g.id
				}
				return g
			}))
			OCP.AppConfig.setValue('libresign', 'groups_request_sign', listOfInputGroupsSelected)
			this.idKey += 1
		},

		async searchGroup(query) {
			this.loadingGroups = true
			try {
				const response = await axios.get(generateOcsUrl('cloud/groups/details'), {
					search: query,
					limit: 20,
					offset: 0,
				})
				this.groups = response.data.ocs.data.groups.sort(function(a, b) {
					return a.displayname.localeCompare(b.displayname)
				})
			} catch (err) {
				console.error('Could not fetch groups', err)
			} finally {
				this.loadingGroups = false
			}
		},
	},

}
</script>
