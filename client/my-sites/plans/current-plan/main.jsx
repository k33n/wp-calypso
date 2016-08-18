/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import Main from 'components/main';
import { getPlansBySite } from 'state/sites/plans/selectors';
import { getSelectedSite } from 'state/ui/selectors';
import { fetchSitePlans } from 'state/sites/plans/actions';
import TrackComponentView from 'lib/analytics/track-component-view';
import PlansNavigation from 'my-sites/upgrades/navigation';
import PlanPurchaseFeatures from 'blocks/plan-purchase-features';

const PlanDetailsComponent = React.createClass( {
	PropTypes: {
		selectedSite: React.PropTypes.object.isRequired,
		sitePlans: React.PropTypes.object.isRequired,
		fetchPlans: React.PropTypes.func.isRequired
	},
	componentWillUpdate: function( props ) {
		this.props.fetchPlans( props );
	},
	componentDidMount: function() {
		this.props.fetchPlans();
	},
	render: function() {
		const { selectedSite } = this.props;
		const currentPlan = selectedSite.plan.product_slug;

		return (
			<Main className="current-plan">
				<PlansNavigation
					sitePlans={ this.props.sitePlans }
					path={ this.props.context.path }
					selectedSite={ selectedSite }
				/>

				<PlanPurchaseFeatures plan={ currentPlan } />

				<TrackComponentView eventName={ 'calypso_plans_my-plan_view' } />
			</Main>
		);
	}
} );

export default connect(
	( state, ownProps ) => {
		return {
			selectedSite: getSelectedSite( state ),
			sitePlans: getPlansBySite( state, getSelectedSite( state ) ),
			context: ownProps.context
		};
	},

	dispatch => ( {
		fetchSitePlans: siteId => dispatch( fetchSitePlans( siteId ) )
	} ),

	( stateProps, dispatchProps ) => {
		function fetchPlans( props = stateProps ) {
			if (
				props.selectedSite &&
				! props.sitePlans.hasLoadedFromServer &&
				! props.sitePlans.isRequesting
			) {
				dispatchProps.fetchSitePlans( props.selectedSite.ID );
			}
		}

		return Object.assign( { fetchPlans }, stateProps );
	}
)( PlanDetailsComponent );
