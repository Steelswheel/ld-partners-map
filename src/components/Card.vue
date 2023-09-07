<template>
	<div :class="`ld-report-card-wrapper ${className ? className : ''}`">
		<div class="ld-report-card">
			<div class="ld-report-card-header">
				<div 
					v-if="isParent && title.length > 0"
					class="ld-report-card-title"
				>
					{{ title }}
				</div>
				<a
					v-if="company_id && title.length > 0"
					class="ld-report-card-title"
					:href="`https://ldrussia.bitrix24.ru/crm/company/details/${company_id}/`"
					target="_blank"
				>
					{{ title }}
				</a>
				<button
					type="button"
					class="ld-report-card-btn"
					v-if="expandeble"
					@click="setExpand"
				>
					<div :class="parentExpand ? 'lh' : ''">
						{{ parentExpand ? '&ndash;': '+' }}
					</div>
				</button>
			</div>
			<div class="ld-report-card-content" v-show="content.length > 0">
				<div
					class="ld-report-card-content-row"
					v-for="item in content"
					:key="item.label"
				>
					<div class="ld-report-card-content-row-label">
						{{ item.label }}
					</div>
					<div class="ld-report-card-content-row-value">
						{{ item.value }}
					</div>
				</div>
			</div>
			<div
				:class="count <= 1 ? 'ld-report-card-inner without-dot' : 'ld-report-card-inner'"
				v-show="parentExpand"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'CardComponent',
		props: {
			company_id: String,
			count: Number,
			id: Number,
			title: String,
			content: Array,
			className: String,
			expandeble: Boolean,
			isParent: Boolean,
			parentExpand: Boolean
		},
		data() {
			return {
				expanded: false
			};
		},
		methods: {
			setExpand() {
				this.expanded = !this.expanded;

				if (this.isParent) {
					this.$emit('changeExpand', this.id, this.expanded);
				} else {
					this.$emit('changeChildrenExpand', this.id, this.expanded);
				}
			}
		},
		watch: {
			parentExpand(value) {
				this.expanded = value;

				setTimeout(() => {
					const wrappers = document.querySelectorAll('.ld-report-inner-wrapper');

					wrappers.forEach((wrapper) => {
						const children = wrapper.querySelectorAll('& > .ld-report-inner-wrapper-child');

						if (children?.length > 1) {
							let count = children.length - 1;
							let height = 0;

							for (let i = 0; i < count; i++) {
								height += children[i].offsetHeight;
							}

							let margin = window.getComputedStyle(children[0]).marginBottom;

							if (margin) {
								height += count * parseInt(margin.replace('px', ''));
							}

							if (height > 0) {
								let wrapper_children = wrapper.children;

								for (let child of wrapper_children) {
									if (child.classList.contains('ld-report-line')) {
										child.remove();
									}
								}

								let line = document.createElement('div');
								line.classList.add('ld-report-line');
								line.style.height = height + 'px';
								wrapper.append(line);
							}
						}
					});
				}, 10);
			}
		}
	};
</script>
<style></style>
