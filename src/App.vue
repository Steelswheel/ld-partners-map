<template>
	<div class="ld-report">
		<button
			type="button"
			class="ld-report-dashboard-btn"
			v-if="cardData.length > 0"
			@click="showDashboard"
		>
			<svg
				width="34"
				height="34"
				viewBox="0 0 34 34"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M2.77301 2.77334C0.333008 5.21668 0.333008 9.14334 0.333008 17C0.333008 24.8567 0.333008 28.785 2.77301 31.225C5.21634 33.6667 9.14301 33.6667 16.9997 33.6667C24.8563 33.6667 28.7847 33.6667 31.2247 31.225C33.6663 28.7867 33.6663 24.8567 33.6663 17C33.6663 9.14334 33.6663 5.21501 31.2247 2.77334C28.7863 0.333344 24.8563 0.333344 16.9997 0.333344C9.14301 0.333344 5.21467 0.333344 2.77301 2.77334ZM26.293 14.4667C26.4958 14.211 26.5907 13.8862 26.5572 13.5616C26.5238 13.237 26.3647 12.9384 26.114 12.7294C25.8633 12.5205 25.5409 12.4179 25.2156 12.4436C24.8903 12.4692 24.5879 12.6211 24.373 12.8667L21.378 16.46C20.7613 17.2017 20.3797 17.6533 20.068 17.935C19.9869 18.0146 19.8956 18.083 19.7963 18.1383L19.778 18.1467L19.7647 18.14L19.7597 18.1383C19.6599 18.0831 19.568 18.0147 19.4863 17.935C19.1747 17.6517 18.7947 17.2017 18.1763 16.46L17.6897 15.8767C17.1413 15.2183 16.648 14.6267 16.188 14.21C15.6863 13.7567 15.0547 13.3533 14.2213 13.3533C13.388 13.3533 12.758 13.7567 12.2547 14.21C11.7947 14.6267 11.3013 15.2183 10.7547 15.8767L7.70467 19.5333C7.59962 19.6595 7.52044 19.8052 7.47167 19.9619C7.42289 20.1187 7.40548 20.2836 7.42041 20.4471C7.45057 20.7773 7.61068 21.082 7.86551 21.2942C8.12034 21.5063 8.44901 21.6086 8.77923 21.5784C9.10945 21.5483 9.41417 21.3882 9.62634 21.1333L12.6213 17.54C13.238 16.7983 13.6197 16.3467 13.9313 16.065C14.0124 15.9854 14.1038 15.917 14.203 15.8617L14.2147 15.8567L14.2213 15.8533L14.2397 15.8617C14.3394 15.917 14.4314 15.9853 14.513 16.065C14.8247 16.3483 15.2047 16.7983 15.823 17.54L16.3097 18.1233C16.858 18.7817 17.3513 19.3733 17.8113 19.79C18.313 20.2433 18.9447 20.6467 19.778 20.6467C20.6113 20.6467 21.2413 20.2433 21.7447 19.79C22.2047 19.3733 22.698 18.7817 23.2447 18.1233L26.293 14.4667Z"
					fill="#FFEC00"
				/>
			</svg>
			<span>Дашборд</span>
		</button>
		<Dashboard
			v-model:isShownDashboard="isShownDashboard"
			:dashboardData="dashboardData"
		/>
		<Filters
			:regions="regions"
			:classes="classes"
			:markets="markets"
			v-model:selectedRegions="selectedRegions"
			v-model:selectedClasses="selectedClasses"
			v-model:selectedMarkets="selectedMarkets"
			v-model:organization="organization"
			v-model:dashboardData="dashboardData"
			@find="getCompaniesData"
		/>
		<div 
			class="ld-report-result" 
			v-if="cardData.length > 0"
		>
			<Card
				v-for="item in cardData"
				:expandeble="item.data?.length > 0"
				:count="item.data?.length ? item.data.length : 0"
				:id="item.id"
				:title="`Класс «${item.class}»`"
				:isParent="true"
				:parentExpand="item.expanded"
				@changeExpand="setExpand"
				:content="[
					{
						label: 'Количество компаний:',
						value: item.companies
					},
					{ label: 'Количество ЦПР:', value: item.cpr },
					{
						label: 'Годовой оборот:',
						value: setMoneyFormat(item.year_money)
					},
					{
						label: 'Потенциал продаж:',
						value: setMoneyFormat(item.potential)
					},
				]"
				:key="item.class"
				className="base"
			>
				<div class="ld-report-inner-wrapper">
					<div
						class="ld-report-inner-wrapper-child"
						v-for="group in item.data"
						:key="group.name"
					>
						<Card
							@changeChildrenExpand="changeChildrenExpand"
							:id="group.id"
							:company_id="group.company_id"
							:isParent="false"
							:parentExpand="group.expanded"
							:count="group.companies?.length ? group.companies.length : 0"
							:expandeble="group.companies?.length > 0"
							:title="group.name"
							:content="[
								{
									label: 'Город:',
									value: group.city
								},
								{
									label: 'Годовой оборот:',
									value: setMoneyFormat(group.year_money)
								},
								{
									label: 'Сфера деятельности:',
									value: group.market
								}
							]"
						>
							<div
								class="ld-report-inner-wrapper"
								v-show="group.companies"
							>
								<div
									class="ld-report-inner-wrapper-child"
									v-for="company in group.companies"
									:key="company.name"
								>
									<WhiteCard
										:company_id="company.id"
										:title="company.name"
										:content="[
											{
												label: 'Город:',
												value: company.city
											},
											{
												label: 'Годовой оборот:',
												value: setMoneyFormat(company.year_money)
											},
											{
												label: 'Сфера деятельности:',
												value: company.market
											}
										]"
									/>
								</div>
							</div>
						</Card>
						<Contact
							v-for="contact in group.contacts"
							:key="contact.id"
							:contact="{
								title: 'ЛПР: ' + contact.name,
								...contact
							}"
						/>
					</div>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import Filters from '@/components/Filters';
	import Card from '@/components/Card';
	import WhiteCard from '@/components/WhiteCard';
	import Contact from '@/components/Contact';
	import Dashboard from '@/components/Dashboard';
	import { moneyFormat } from '@/main';

	export default {
		name: 'AppComponent',
		components: {
			Filters,
			Card,
			Contact,
			WhiteCard,
			Dashboard
		},
		data() {
			return {
				BX24: undefined,
				isShownDashboard: false,
				organization: '',
				regions: [
					{
						value: 'all',
						label: 'Все регионы'
					}
				],
				classes: [
					{
						value: 'all',
						label: 'Все классы'
					}
				],
				markets: [
					{
						value: 'all',
						label: 'Все сферы'
					}
				],
				selectedRegions: [],
				selectedClasses: [],
				selectedMarkets: [],
				dashboardData: {
					regions: '',
					market_companies: 0,
					market_potential: 0,
					fact: 0,
					companies_A: 0,
					companies_B: 0,
					companies_C: 0,
					loyal_companies_A: 0,
					loyal_companies_B: 0,
					loyal_companies_C: 0
				},
				cardData: []
			};
		},
		watch: {
			cardData: {
				deep: true,
				handler(value) {
					if (value.length > 0) {
						let potential = 0;
						let loyal_companies_A = 0;
						let loyal_companies_B = 0;
						let loyal_companies_C = 0;

						value.forEach(item => {
							potential += item.potential;
							
							switch (item.class) {
								case 'A':
									this.dashboardData.companies_A = item.companies;
									item.data.forEach(c => {
										if (c.is_loyal) {
											loyal_companies_A++;
										}

										c.companies.forEach(i => {
											if (i.is_loyal) {
												loyal_companies_A++;
											}
										})
									});
									break;
								case 'B':
									this.dashboardData.companies_B = item.companies;
									item.data.forEach(c => {
										c.companies.forEach(i => {
											if (c.is_loyal) {
												loyal_companies_B++;
											}

											if (i.is_loyal) {
												loyal_companies_B++;
											}
										})
									});
									break;
								case 'C':
									this.dashboardData.companies_C = item.companies;
									item.data.forEach(c => {
										c.companies.forEach(i => {
											if (c.is_loyal) {
												loyal_companies_C++;
											}

											if (i.is_loyal) {
												loyal_companies_C++;
											}
										})
									});
									break;
							}
						});

						this.dashboardData.fact = potential;
						this.dashboardData.loyal_companies_A = loyal_companies_A;
						this.dashboardData.loyal_companies_B = loyal_companies_B;
						this.dashboardData.loyal_companies_C = loyal_companies_C;
					}
				}
			},
			isShownDashboard(value) {
				if (value) {
					document.body.style.position = 'fixed';
				} else {
					document.body.style.position = '';
				}
			}
		},
		methods: {
			setMoneyFormat(n, p = 0, s = true) {
				return moneyFormat(n, p, s);
			},
			getBXFields() {
				if (this.BX24) {
					let self = this;

					self.BX24.callMethod(
						'lists.element.get',
						{
							IBLOCK_TYPE_ID: 'lists',
							IBLOCK_ID: '137',
							ELEMENT_ORDER: { NAME: 'ASC' }
						},
						(result) => {
							if (result.error()) {
								console.log(result.error());
							} else {
								let res = result.data().map((item) => {
									return { value: item.ID, label: item.NAME };
								});

								res.forEach((item) => self.regions.push(item));

								if (result.more()) {
									result.next();
								}
							}
						}
					);

					let markets = [];

					self.BX24.callMethod(
						'crm.status.list', 
						{
							order: { 'SORT': 'ASC' },
							filter: { 'ENTITY_ID': 'INDUSTRY' }
						},
						(result) => {
							if (result.error()) {
								console.error(result.error());
							} else {
								let res = result.data().map(item => {
									return {
										value: item.STATUS_ID,
										label: item.NAME
									}
								});

								markets = [...markets, ...res];

								if (result.more()) {
									result.next();
								} else {
									self.markets = [...self.markets, ...markets];
								}
							}
						}
					);

					self.BX24.callMethod(
						'crm.company.userfield.list',
						{
							order: { FIELD_NAME: 'ASC' },
						},
						(result) => {
							if (result.error()) {
								console.error(result.error());
							} else {
								const query_data = result.data();

								const classes_field = query_data.find((field) => field.FIELD_NAME === process.env.VUE_APP_CLIENT_CLASSES);

								if (classes_field) {
									let classes_data = classes_field.LIST.map((item) => {
										return {
											label: "Класс " + item.VALUE,
											value: item.ID,
										};
									});

									classes_data.forEach((item) => self.classes.push(item));
								}
							}
						}
					);
				}
			},
			processCompanies(company_group, parent_group, current_class) {
				const self = this;

				parent_group.year_money = company_group.reduce((sum, current) => {
					if (current.REVENUE) {
						return sum + parseFloat(current.REVENUE)
					} else {
						return sum + 0;
					}
				}, 0);

				parent_group.potential = company_group.reduce((sum, current) => {
					if (current[process.env.VUE_APP_POTENTIAL]) {
						return sum + parseFloat(current[process.env.VUE_APP_POTENTIAL])
					} else {
						return sum + 0;
					}
				}, 0);

				let count = 1;

				const class_A = this.classes.find((c) => c.label === 'Класс A').value;

				const class_B = this.classes.find((c) => c.label === 'Класс B').value;

				const class_C = this.classes.find((c) => c.label === 'Класс C').value;

				company_group.forEach((company) => {
					let markets = "Не указано";

					if (company[process.env.VUE_APP_IS_CPR] === '1') {
						parent_group.cpr++;
					}

					if (company[process.env.VUE_APP_MARKETS]) {
						markets = this.markets.find((i) => i.value === company[process.env.VUE_APP_MARKETS])?.label;
					}

					let lpr = [];

					let is_loyal_company = false;

					if (Array.isArray(company[process.env.VUE_APP_IS_LOYAL])) {
						if (company[process.env.VUE_APP_IS_LOYAL].length > 0 && !company[process.env.VUE_APP_IS_LOYAL].includes('4037')) {
							is_loyal_company = true;
						}
					} else {
						if (company[process.env.VUE_APP_IS_LOYAL] && !company[process.env.VUE_APP_IS_LOYAL] === '4037') {
							is_loyal_company = true;
						}
					}

					let data = {
						id: count + parent_group.class,
						company_id: company.ID,
						name: company.TITLE,
						city: company[process.env.VUE_APP_CITY] ? company[process.env.VUE_APP_CITY] : 'Не указано',
						year_money: parseFloat(company.REVENUE),
						market: markets,
						contacts: [],
						companies: [],
						is_loyal: is_loyal_company,
						expanded: false
					};

					count++;

					if (Array.isArray(company[process.env.VUE_APP_LPR])) {
						self.BX24.callMethod(
							'crm.contact.list',
							{
								order: { ID: 'ASC' },
								filter: {
									ID: company[process.env.VUE_APP_LPR]
								},
								select: [
									'ID',
									'NAME',
									'LAST_NAME',
									'EMAIL',
									'PHONE'
								]
							},
							(result) => {
								if (result.error()) {
									console.log(result.error());
								} else {
									let res = result.data().map((item) => {
										let phone = 'Не указано';
										let email = 'Не указано';
										let name = '';

										if (item.LAST_NAME) {
											name = item.NAME + ' ' + item.LAST_NAME;
										} else {
											name = item.NAME;
										}

										if (Array.isArray(item.PHONE)) {
											phone = item.PHONE.map((phone) => phone.VALUE).join(', ').trim();
										}

										if (Array.isArray(item.EMAIL)) {
											email = item.EMAIL.map((email) => email.VALUE).join(', ').trim();
										}

										return {
											id: item.ID,
											name: name.trim(),
											phone,
											email
										};
									});

									lpr = [...lpr, ...res];

									if (result.more()) {
										result.next();
									} else {
										data.contacts = lpr;
									}
								}
							}
						);
					}

					let companies = [];

					if (Array.isArray(company[process.env.VUE_APP_ASSIGNED_COMPANIES])) {
						let filter = {};

						filter[`!=${process.env.VUE_APP_IS_CPR}`] = '1';
						filter[process.env.VUE_APP_CPR] = company.ID;

						switch (current_class) {
							case 'A':
								filter[process.env.VUE_APP_CLIENT_CLASSES] = class_A;
								break;
							case 'B':
								filter[process.env.VUE_APP_CLIENT_CLASSES] = class_B;
								break;
							case 'C':
								filter[process.env.VUE_APP_CLIENT_CLASSES] = class_C;
								break;
						}

						if (self.selectedMarkets.length > 0) {
							if (self.selectedMarkets.includes('all')) {
								filter[process.env.VUE_APP_MARKETS] = self.markets.filter((item) => item.value !== 'all').map((item) => item.value);
							} else {
								filter[process.env.VUE_APP_MARKETS] = self.selectedMarkets;
							}
						}

						if (self.selectedRegions.length > 0) {
							if (self.selectedRegions.includes("all")) {
								filter[process.env.VUE_APP_REGIONS] = self.regions.filter((item) => item.value !== 'all').map((item) => item.value);
							} else {
								filter[process.env.VUE_APP_REGIONS] = self.selectedRegions;
							}
						}

						self.BX24.callMethod(
							'crm.company.list',
							{
								order: { ID: 'ASC' },
								filter,
								select: [
									'ID',
									'TITLE',
									'REVENUE',
									process.env.VUE_APP_CLIENT_CLASSES,
									process.env.VUE_APP_MARKETS,
									process.env.VUE_APP_CITY,
									process.env.VUE_APP_IS_CPR,
									process.env.VUE_APP_POTENTIAL
								]
							},
							(result) => {
								if (result.error()) {
									console.log(result.error());
								} else {
									let res = result.data().map((item) => {
										let markets = 'Не указано';

										if (company[process.env.VUE_APP_MARKETS]) {
											markets = this.markets.find((i) => i.value === company[process.env.VUE_APP_MARKETS])?.label;
										}

										let city = 'Не указан';

										if (item[process.env.VUE_APP_CITY]) {
											city = item[process.env.VUE_APP_CITY];
										}

										let is_loyal = false;

										if (Array.isArray(item[process.env.VUE_APP_IS_LOYAL])) {
											if (item[process.env.VUE_APP_IS_LOYAL].length > 0 && !item[process.env.VUE_APP_IS_LOYAL].includes('4037')) {
												is_loyal = true;
											}
										} else {
											if (item[process.env.VUE_APP_IS_LOYAL] && !item[process.env.VUE_APP_IS_LOYAL] === '4037') {
												is_loyal = true;
											}
										}

										return {
											id: item.ID,
											name: item.TITLE,
											city,
											year_money: item.REVENUE ? parseFloat(item.REVENUE): 0,
											potential: item[process.env.VUE_APP_POTENTIAL] ? parseFloat(item[process.env.VUE_APP_POTENTIAL]) : 0,
											market: markets,
											is_loyal
										};
									});

									companies = [...companies, ...res];

									if (result.more()) {
										result.next();
									} else {
										data.companies = companies;

										parent_group.companies += companies.length;

										companies.forEach(company => {
											parent_group.year_money += company.year_money;
											parent_group.potential += company.potential;
										});
									}
								}
							}
						);
					}

					parent_group.data.push(data);
				});
			},
			processCompanyData(companyData) {
				const class_A = this.classes.find((c) => c.label === 'Класс A').value;

				const class_B = this.classes.find((c) => c.label === 'Класс B').value;

				const class_C = this.classes.find((c) => c.label === 'Класс C').value;

				const class_A_companies = companyData.filter((company) => company[process.env.VUE_APP_CLIENT_CLASSES] === class_A);

				const class_B_companies = companyData.filter((company) => company[process.env.VUE_APP_CLIENT_CLASSES] === class_B);

				const class_C_companies = companyData.filter((company) => company[process.env.VUE_APP_CLIENT_CLASSES] === class_C);

				if (class_A_companies?.length > 0) {
					const A = {
						data: [],
						class: 'A',
						cpr: 0,
						year_money: 0,
						potential: 0,
						expanded: false,
						companies: class_A_companies.length,
						id: 1
					};

					this.cardData.push(A);

					this.processCompanies(class_A_companies, this.cardData[0], 'A');
				}

				if (class_B_companies?.length > 0) {
					const B = {
						data: [],
						class: 'B',
						cpr: 0,
						year_money: 0,
						potential: 0,
						expanded: false,
						companies: class_B_companies.length,
						id: 2
					};

					this.cardData.push(B);

					this.processCompanies(class_B_companies, this.cardData[1], 'B');
				}

				if (class_C_companies?.length > 0) {
					const C = {
						data: [],
						class: 'C',
						cpr: 0,
						year_money: 0,
						potential: 0,
						expanded: false,
						companies: class_C_companies.length,
						id: 3
					};

					this.cardData.push(C);

					this.processCompanies(class_C_companies, this.cardData[2], 'C');
				}
			},
			getCompaniesData() {
				if (this.BX24) {
					this.cardData = [];

					this.dashboardData = {
						regions: this.dashboardData.regions,
						market_companies: 0,
						market_potential: 0,
						fact: 0,
						companies_A: 0,
						companies_B: 0,
						companies_C: 0,
						loyal_companies_A: 0,
						loyal_companies_B: 0,
						loyal_companies_C: 0
					};

					let filter = {};

					filter[process.env.VUE_APP_IS_CPR] = '1';

					const self = this;

					if (self.organization.length > 0) {
						filter['%TITLE'] = self.organization;
					}

					if (self.selectedRegions.length > 0) {
						if (self.selectedRegions.includes("all")) {
							filter[process.env.VUE_APP_REGIONS] = self.regions.filter((item) => item.value !== 'all').map((item) => item.value);
						} else {
							filter[process.env.VUE_APP_REGIONS] = self.selectedRegions;
						}
					}

					if (self.selectedClasses.length > 0) {
						if (self.selectedClasses.includes('all')) {
							filter[process.env.VUE_APP_CLIENT_CLASSES] = self.classes.filter((item) => item.value !== 'all').map((item) => item.value);
						} else {
							filter[process.env.VUE_APP_CLIENT_CLASSES] = self.selectedClasses;
						}
					}

					if (self.selectedMarkets.length > 0) {
						if (self.selectedMarkets.includes('all')) {
							filter[process.env.VUE_APP_MARKETS] = self.markets.filter((item) => item.value !== 'all').map((item) => item.value);
						} else {
							filter[process.env.VUE_APP_MARKETS] = self.selectedMarkets;
						}
					}

					let companyData = [];

					self.BX24.callMethod(
						'crm.company.list',
						{
							order: { ID: 'ASC' },
							select: [
								'ID',
								'ACTIVE',
								'TITLE',
								'REVENUE',
								process.env.VUE_APP_ASSIGNED_COMPANIES,
								process.env.VUE_APP_CLIENT_CLASSES,
								process.env.VUE_APP_CITY,
								process.env.VUE_APP_REGIONS,
								process.env.VUE_APP_MARKETS,
								process.env.VUE_APP_LPR,
								process.env.VUE_APP_POTENTIAL,
								process.env.VUE_APP_IS_CPR,
								process.env.VUE_APP_IS_LOYAL
							],
							filter
						},
						(result) => {
							if (result.error()) {
								console.log(result.error());
							} else {
								companyData = [...companyData, ...result.data()];

								if (result.more()) {
									result.next();
								} else {
									if (companyData.length > 0) {
										self.processCompanyData(companyData);
									}
								}
							}
						},
					);

					let dashboard_res = [];

					self.BX24.callMethod(
						'lists.element.get',
						{
							IBLOCK_TYPE_ID: 'lists',
							IBLOCK_ID: '155',
							ELEMENT_ORDER: { NAME: 'ASC' },
							FILTER: {
								PROPERTY_1149: new Date().getFullYear()
							}
						},
						(result) => {
							if (result.error()) {
								console.log(result.error());
							} else {
								dashboard_res = [...dashboard_res, ...result.data()];

								if (result.more()) {
									result.next();
								} else {
									let regions = self.selectedRegions;

									if (self.selectedRegions.includes('all')) {
										regions = self.regions.filter((item) => item.value !== 'all').map((item) => item.value);
									}

									dashboard_res = dashboard_res.filter((item) => {
										let region = Object.values(item[process.env.VUE_APP_DASHBOARD_REGION])[0];

										if (regions.includes(region)) {
											return item;
										}
									})
									.map((item) => {
										let companies = 0;
										let market_potential = 0;

										if (Object.values(item[process.env.VUE_APP_DASHBOARD_POTENTIAL])[0]) {
											market_potential = parseFloat(Object.values(item[process.env.VUE_APP_DASHBOARD_POTENTIAL])[0]);
										}

										if (Object.values(item[process.env.VUE_APP_DASHBOARD_COMPANIES])[0]) {
											companies = parseInt(Object.values(item[process.env.VUE_APP_DASHBOARD_COMPANIES])[0]);
										}

										return {
											companies,
											market_potential
										};
									});

									if (dashboard_res.length > 0) {
										dashboard_res.forEach((item) => {
											self.dashboardData.market_companies += item.companies;
											self.dashboardData.market_potential += item.market_potential;
										});
									}
								}
							}
						}
					);
				} else {
					console.log('Не найдена js-библиотека Битрикс24');
				}
			},
			showDashboard() {
				this.isShownDashboard = !this.isShownDashboard;
			},
			setExpand(id, value) {
				this.cardData.forEach((card) => (card.expanded = false));

				let card = this.cardData.find((card) => card.id === id);

				card.expanded = value;
			},
			changeChildrenExpand(id, value) {
				this.cardData.forEach((card) => {
					if (card.data.length > 0) {
						card.data.forEach((c) => {
							if (c.id === id) {
								c.expanded = value;
							} else {
								c.expanded = false;
							}
						});
					}
				});
			}
		},
		mounted() {
			if (window.BX24) {
				let self = this;

				self.BX24 = window.BX24;

				self.BX24.init(() => {
					self.getBXFields();
				});
			}
		}
	};
</script>

<style lang="scss"></style>
