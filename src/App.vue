<!--
  - SPDX-FileCopyrightText: 2021 LibreCode coop and LibreCode contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcContent app-name="libresign" :class="{'sign-external-page': isSignExternalPage}">
		<LeftSidebar />
		<NcAppContent :class="{'icon-loading' : loading }">
			<router-view v-if="!loading" :key="$route.name " :loading.sync="loading" />
			<NcEmptyContent v-if="isRoot" :description="t('libresign', 'LibreSign, digital signature app for Nextcloud.')">
				<template #icon>
					<img :src="LogoLibreSign">
				</template>
			</NcEmptyContent>
		</NcAppContent>
		<RightSidebar />
	</NcContent>
</template>

<script>
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'

import LeftSidebar from './Components/LeftSidebar/LeftSidebar.vue'
import RightSidebar from './Components/RightSidebar/RightSidebar.vue'

import LogoLibreSign from './../img/logo-gray.svg'

export default {
	name: 'App',
	components: {
		NcContent,
		NcAppContent,
		NcEmptyContent,
		LeftSidebar,
		RightSidebar,
	},
	data() {
		return {
			loading: false,
			LogoLibreSign,
		}
	},
	computed: {
		isRoot() {
			return this.$route.path === '/'
		},
		isSignExternalPage() {
			return this.$route.path.startsWith('/p/')
		},
	},
}
</script>

<style lang="scss" scoped>
.sign-external-page {
	width: 100%;
	height: 100%;
	margin: unset;
	box-sizing: unset;
	border-radius: unset;
}
.app-libresign {
	.app-navigation {
		.app-navigation-entry.active {
			background-color: var(--color-primary-element) !important;
			.app-navigation-entry-link{
				color: var(--color-primary-element-text) !important;
			}
		}
	}
}

.app-content {
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 70%;
		margin-top: unset !important;

		margin-top: 10vh;
		p {
			opacity: .6;
		}

		&__icon {
			width: 400px !important;
			height: unset !important;
		}
	}
}
</style>
