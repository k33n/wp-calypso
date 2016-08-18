/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import page from 'page';

/**
 * Internal Dependencies
 */
import Main from 'components/main';
import { getPlansBySite } from 'state/sites/plans/selectors';
import { getSelectedSite, getSelectedSiteId } from 'state/ui/selectors';
import TrackComponentView from 'lib/analytics/track-component-view';
import PlansNavigation from 'my-sites/upgrades/navigation';
import PlanPurchaseFeatures from 'blocks/plan-purchase-features';
import QuerySites from 'components/data/query-sites';
import QuerySitePlans from 'components/data/query-site-plans';
import { isFreePlan } from 'lib/products-values';

class CurrentPlan extends Component {
	static propTypes = {
		selectedSite: PropTypes.object,
		sitePlans: PropTypes.object
	};

	isLoading() {
		const { selectedSite, sitePlans } = this.props;

		return ! selectedSite || ! sitePlans.hasLoadedFromServer;
	}

	redirectToPlans() {
		const { selectedSite } = this.props;

		if ( ! selectedSite ) {
			return;
		}

		page.redirect( `/plans/${ selectedSite.slug }` );
	}

	render() {
		const {
			selectedSite,
			selectedSiteId,
			sitePlans,
			context
		} = this.props;

		const currentPlan = selectedSite.plan,
			currentPlanSlug = selectedSite.plan.product_slug,
			isLoading = this.isLoading();

		if ( isFreePlan( currentPlan ) ) {
			this.redirectToPlans();
		}

		return (
			<Main className="current-plan" wideLayout>
				<QuerySites siteId={ selectedSiteId } />
				<QuerySitePlans siteId={ selectedSiteId } />

				<PlansNavigation
					sitePlans={ sitePlans }
					path={ context.path }
					selectedSite={ selectedSite }
				/>

				<PlanPurchaseFeatures
					plan={ currentPlanSlug }
					selectedSite={ selectedSite }
					sitePlans={ sitePlans }
					page="current-plan"
					isPlaceholder={ isLoading }
				/>

				<TrackComponentView eventName={ 'calypso_plans_my-plan_view' } />
			</Main>
		);
	}
}

export default connect(
	( state, ownProps ) => {
		const selectedSite = getSelectedSite( state );

		return {
			selectedSite,
			selectedSiteId: getSelectedSiteId( state ),
			sitePlans: getPlansBySite( state, selectedSite ),
			context: ownProps.context
		};
	}
)( CurrentPlan );
