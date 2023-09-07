<template>
	<div class="ld-report-filters">
		<div class="ld-report-filters-region">
			<el-select
				v-model="localSelectedRegions"
				@change="changeRegions"
				filterable
				placeholder="Выберите регион"
				multiple
				collapse-tags
				collapse-tags-tooltip
			>
				<el-option
					v-for="item in regions"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</div>
		<div class="ld-report-filters-class">
			<el-select
				v-model="localSelectedClasses"
				@change="changeClasses"
				placeholder="Выберите класс"
				multiple
				collapse-tags
				collapse-tags-tooltip
			>
				<el-option
					v-for="item in classes"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</div>
		<div class="ld-report-filters-market">
			<el-select
				v-model="localSelectedMarkets"
				@change="changeMarkets"
				placeholder="Выберите сферу деятельности"
				multiple
				collapse-tags
				collapse-tags-tooltip
			>
				<el-option
					v-for="item in markets"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				/>
			</el-select>
		</div>
		<div class="ld-report-filters-search">
			<el-input
				v-model="localOrganization"
				@change="changeOrganization"
				placeholder="Введите название организации"
				clearable
			/>
		</div>
		<button
			type="button"
			class="ld-report-filters-btn"
			v-if="(localSelectedRegions.length > 0 && localSelectedClasses.length > 0 && localSelectedMarkets.length > 0) || localOrganization.length > 0"
			@click="$emit('find')"
		>
			<svg
				width="22"
				height="22"
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18.3658 17.2526L21.4453 20.3306C21.5889 20.4793 21.6684 20.6784 21.6666 20.8851C21.6648 21.0918 21.5819 21.2896 21.4357 21.4358C21.2896 21.5819 21.0918 21.6649 20.8851 21.6666C20.6784 21.6684 20.4792 21.589 20.3305 21.4454L17.251 18.3659C15.2386 20.09 12.6367 20.9677 9.9911 20.8148C7.34554 20.6619 4.86203 19.4902 3.06171 17.5456C1.2614 15.6011 0.284213 13.0348 0.335213 10.3853C0.386214 7.73586 1.46143 5.2091 3.33525 3.33528C5.20907 1.46146 7.73583 0.386245 10.3853 0.335244C13.0348 0.284243 15.6011 1.26143 17.5456 3.06174C19.4902 4.86206 20.6618 7.34557 20.8147 9.99113C20.9677 12.6367 20.09 15.2387 18.3658 17.2511V17.2526ZM10.5827 19.2552C12.8828 19.2552 15.0886 18.3415 16.715 16.7151C18.3414 15.0887 19.2551 12.8828 19.2551 10.5827C19.2551 8.28265 18.3414 6.07678 16.715 4.45038C15.0886 2.82398 12.8828 1.91028 10.5827 1.91028C8.28262 1.91028 6.07675 2.82398 4.45035 4.45038C2.82395 6.07678 1.91025 8.28265 1.91025 10.5827C1.91025 12.8828 2.82395 15.0887 4.45035 16.7151C6.07675 18.3415 8.28262 19.2552 10.5827 19.2552Z"
					fill="black"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'FiltersComponent',
		props: {
			regions: Array,
			classes: Array,
			markets: Array,
			organization: String,
			selectedRegions: Array,
			selectedClasses: Array,
			selectedMarkets: Array,
			dashboardData: Object
		},
		data() {
			return {
				localOrganization: this.organization,
				localSelectedRegions: this.selectedRegions,
				localSelectedClasses: this.selectedClasses,
				localSelectedMarkets: this.selectedMarkets,
				localDashboardData: {
					fact: this.dashboardData.fact,
					regions: this.dashboardData.regions,
					market_companies: this.dashboardData.market_companies,
					market_potential: this.dashboardData.market_potential,
					companies_A: this.dashboardData.companies_A,
					companies_B: this.dashboardData.companies_B,
					companies_C: this.dashboardData.companies_C,
					loyal_companies_A: this.dashboardData.loyal_companies_A,
					loyal_companies_B: this.dashboardData.loyal_companies_B,
					loyal_companies_C: this.dashboardData.loyal_companies_C
				}
			};
		},
		watch: {
			localSelectedRegions(value) {
				const regionsDashboardData = [];

				value.forEach((region) => {
					let result = this.regions.find((r) => r.value === region)?.label;

					if (result && !regionsDashboardData.includes('Все регионы')) {
						regionsDashboardData.push(result);
					}
				});

				this.localDashboardData.regions = regionsDashboardData.sort().join(', ').trim();

				this.$emit('update:dashboardData', this.localDashboardData);
			}
		},
		methods: {
			changeRegions(value) {
				if (value.length > 1) {
					if (value.includes('all')) {
						let index = value.findIndex((item) => item === 'all');

						if (index === value.length - 1) {
							value = value.filter((item) => item === 'all');
						} else {
							value = value.filter((item) => item !== 'all');
						}
					}
				}

				this.$emit('update:selectedRegions', value);
				this.localSelectedRegions = value;
			},
			changeClasses(value) {
				if (value.length > 1) {
					if (value.includes('all')) {
						let index = value.findIndex((item) => item === 'all');

						if (index === value.length - 1) {
							value = value.filter((item) => item === 'all');
						} else {
							value = value.filter((item) => item !== 'all');
						}
					}
				}

				this.$emit('update:selectedClasses', value);
				this.localSelectedClasses = value;
			},
			changeMarkets(value) {
				if (value.length > 1) {
					if (value.includes('all')) {
						let index = value.findIndex((item) => item === 'all');

						if (index === value.length - 1) {
							value = value.filter((item) => item === 'all');
						} else {
							value = value.filter((item) => item !== 'all');
						}
					} else {
						if (value.length === this.markets.lenght - 1) {
							value = value.filter((item) => item === 'all');
						}
					}
				}

				this.$emit('update:selectedMarkets', value);
				this.localSelectedMarkets = value;
			},
			changeOrganization(value) {
				this.$emit('update:organization', value);
			}
		}
	};
</script>

<style lang="scss"></style>
