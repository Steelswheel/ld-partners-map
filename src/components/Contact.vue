<template>
	<div class="ld-report-contact">
		<el-collapse v-model="activeName">
			<el-collapse-item :title="contact.title" :name="contact.id">
				<div class="ld-report-contact-row">
					<div class="ld-report-contact-row-label">Телефон:</div>
					<div class="ld-report-contact-row-value">
						{{ contact.phone }}
					</div>
				</div>
				<div class="ld-report-contact-row">
					<div class="ld-report-contact-row-label">Email:</div>
					<div class="ld-report-contact-row-value">
						{{ contact.email }}
					</div>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
	export default {
		name: 'ContactComponent',
		props: {
			contact: Object
		},
		data() {
			return {
				activeName: ''
			};
		}
	};
</script>
