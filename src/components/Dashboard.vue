<template>
	<div :class="`ld-report-dashboard ${isShownDashboard ? '' : 'hidden'}`">
		<button
			type="button"
			class="ld-report-dashboard-ribbon"
			@click="$emit('update:isShownDashboard', false)"
		>
			<svg
				width="25"
				height="25"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.8803 12L24.6003 2.27998C24.8187 2.02491 24.9329 1.69681 24.9199 1.36124C24.9069 1.02568 24.7678 0.707358 24.5304 0.469898C24.2929 0.232439 23.9746 0.0933283 23.639 0.0803668C23.3035 0.0674052 22.9754 0.181547 22.7203 0.399982L13.0003 10.12L3.28029 0.386649C3.02522 0.168214 2.69712 0.0540729 2.36155 0.0670344C2.02598 0.079996 1.70767 0.219105 1.47021 0.456565C1.23275 0.694024 1.09364 1.01234 1.08067 1.34791C1.06771 1.68348 1.18186 2.01158 1.40029 2.26665L11.1203 12L1.38696 21.72C1.24738 21.8395 1.13402 21.9866 1.05399 22.152C0.973959 22.3174 0.928985 22.4976 0.921892 22.6812C0.914799 22.8649 0.945741 23.048 1.01277 23.2191C1.07981 23.3902 1.18148 23.5456 1.31142 23.6755C1.44136 23.8055 1.59676 23.9071 1.76786 23.9742C1.93896 24.0412 2.12207 24.0721 2.3057 24.065C2.48932 24.058 2.6695 24.013 2.83492 23.933C3.00034 23.8529 3.14743 23.7396 3.26696 23.6L13.0003 13.88L22.7203 23.6C22.9754 23.8184 23.3035 23.9326 23.639 23.9196C23.9746 23.9066 24.2929 23.7675 24.5304 23.5301C24.7678 23.2926 24.9069 22.9743 24.9199 22.6387C24.9329 22.3032 24.8187 21.9751 24.6003 21.72L14.8803 12Z"
					fill="white"
				/>
			</svg>
		</button>
		<div class="ld-report-dashboard-content">
			<div class="ld-report-dashboard-header">
				Дашборд сводных данных
			</div>
			<table class="ld-report-dashboard-selected-params">
				<tbody>
					<tr>
						<td class="ld-report-dashboard-selected-params-label">
							Регион
						</td>
						<td class="ld-report-dashboard-selected-params-value">
							{{ dashboardData.regions ? dashboardData.regions : '-' }}
						</td>
					</tr>
					<tr>
						<td class="ld-report-dashboard-selected-params-label">
							Класс
						</td>
						<td class="ld-report-dashboard-selected-params-value">
							A, B, C
						</td>
					</tr>
					<tr>
						<td class="ld-report-dashboard-selected-params-label">
							Сфера деятельности:
						</td>
						<td class="ld-report-dashboard-selected-params-value">
							Все сферы
						</td>
					</tr>
				</tbody>
			</table>
			<div class="ld-report-dashboard-title">Данные по продажам</div>
			<table class="ld-report-dashboard-table">
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th>Рынок</th>
						<th>Факт</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Потенциальных продаж, руб.</td>
						<td></td>
						<td>
							{{ dashboardData.market_potential ? setMoneyFormat(dashboardData.market_potential, 0, false) : '-' }}
						</td>
						<td>
							{{ dashboardData.fact ? setMoneyFormat(dashboardData.fact, 0, false) : '-' }}
						</td>
					</tr>
					<tr>
						<td>Количество компаний,<br />из них:</td>
						<td></td>
						<td>
							{{ dashboardData.market_companies ? dashboardData.market_companies : '-' }}
						</td>
						<td>
							{{ dashboardData.companies_A + dashboardData.companies_B + dashboardData.companies_C ? dashboardData.companies_A + dashboardData.companies_B + dashboardData.companies_C : '-'}}
						</td>
					</tr>
					<tr>
						<td></td>
						<td>A</td>
						<td>-</td>
						<td>
							{{ dashboardData.companies_A ? dashboardData.companies_A : '-' }}
						</td>
					</tr>
					<tr>
						<td></td>
						<td>B</td>
						<td>-</td>
						<td>
							{{ dashboardData.companies_B ? dashboardData.companies_B : '-' }}
						</td>
					</tr>
					<tr>
						<td></td>
						<td>C</td>
						<td>-</td>
						<td>
							{{ dashboardData.companies_C ? dashboardData.companies_C : '-' }}
						</td>
					</tr>
					<tr>
						<td>
							Работают с LD,<br />
							из них:
						</td>
						<td></td>
						<td>-</td>
						<td>
							{{ dashboardData.loyal_companies_A + dashboardData.loyal_companies_B + dashboardData.loyal_companies_C ? dashboardData.loyal_companies_A + dashboardData.loyal_companies_B + dashboardData.loyal_companies_C : '-' }}
						</td>
					</tr>
					<tr>
						<td></td>
						<td>A</td>
						<td>-</td>
						<td>
							{{ dashboardData.loyal_companies_A ? dashboardData.loyal_companies_A : '-' }}
						</td>
					</tr>
					<tr>
						<td></td>
						<td>B</td>
						<td>-</td>
						<td>
							{{ dashboardData.loyal_companies_B ? dashboardData.loyal_companies_B : '-' }}
						</td>
					</tr>
					<tr>
						<td></td>
						<td>C</td>
						<td>-</td>
						<td>
							{{ dashboardData.loyal_companies_C ? dashboardData.loyal_companies_C : '-' }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import { moneyFormat } from '@/main';

	export default {
		name: 'DashboardComponent',
		props: {
			dashboardData: Object,
			isShownDashboard: Boolean
		},
		data() {
			return {};
		},
		methods: {
			setMoneyFormat(n, p = 0, s = true) {
				return moneyFormat(n, p, s);
			}
		}
	};
</script>
<style></style>
