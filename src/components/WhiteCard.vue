<template>
	<div :class="`ld-report-white-card-wrapper ${className ? className : ''}`">
		<div class="ld-report-white-card">
			<div class="ld-report-white-card-header">
				<a 
					v-if="company_id.length > 0 && title.length > 0"
					class="ld-report-white-card-title"
					:href="`https://ldrussia.bitrix24.ru/crm/company/details/${company_id}/`"
					target="_blank"
				>
					{{ title }}
				</a>
			</div>
			<div
				class="ld-report-white-card-content"
				v-show="content.length > 0"
			>
				<div
					class="ld-report-white-card-content-row"
					v-for="item in content"
					:key="item.label"
				>
					<div class="ld-report-white-card-content-row-label">
						{{ item.label }}
					</div>
					<div class="ld-report-white-card-content-row-value">
						{{ item.value }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'WhiteCardComponent',
		props: {
			company_id: String,
			title: String,
			content: Array,
			className: String
		}
	};
</script>
<style></style>
