/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

class CurrentPlan extends Component {
	static propTypes = {
		selectedSite: PropTypes.object,
		sitePlans: PropTypes.object
	};

	render() {
		const {
			selectedSite,
			selectedSiteId,
			sitePlans,
			context
		} = this.props;

		const currentPlan = selectedSite.plan.product_slug;

		if ( ! sitePlans.hasLoadedFromServer ) {
			return null;
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
					plan={ currentPlan }
					selectedSite={ selectedSite }
					sitePlans={ sitePlans }
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
