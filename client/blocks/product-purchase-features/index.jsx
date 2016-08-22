/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import {
	PLAN_FREE,
	PLAN_PERSONAL,
	PLAN_PREMIUM,
	PLAN_BUSINESS,
} from 'lib/plans/constants';
import HappinessSupport from './happiness-support';
import CurrentPlanHeader from './current-plan-header';
import { plansList } from 'lib/plans/constants';
import ProductPurchaseFeaturesList from './product-purchase-features-list';

class PlanPurchaseFeatures extends Component {
	static propTypes = {
		plan: PropTypes
			.oneOf( [ PLAN_FREE, PLAN_PERSONAL, PLAN_PREMIUM, PLAN_BUSINESS ] )
			.isRequired,
		selectedSite: PropTypes.object,
		sitePlans: PropTypes.object,
		page: PropTypes
			.oneOf( [ 'current-plan', 'checkout-thank-you' ] )
			.isRequired,
		isPlaceholder: PropTypes.bool
	};

	static defaultProps = {
		isPlaceholder: false
	};

	getPlanHeaderWording() {
		const { plan, translate } = this.props;

		const planConstObj = plansList[ plan ],
			title = translate( 'Your site is on a %(planName)s plan', {
				args: {
					planName: planConstObj.getTitle()
				}
			} );

		let tagLine = translate( 'Unlock the full potential of your site with all the features included in your plan.' );

		if ( plan === PLAN_BUSINESS ) {
			tagLine = translate( 'Learn more about everything included with Business and take advantage of' +
				' its professional features.' );
		}

		return {
			title: title,
			tagLine: tagLine
		};
	}

	getPlanPurchaseHeader() {
		const {
			page,
			selectedSite,
			isPlaceholder
		} = this.props;

		if ( page === 'current-plan' ) {
			const { title, tagLine } = this.getPlanHeaderWording();

			return [
				<CurrentPlanHeader
					selectedSite={ selectedSite }
					key="currentPlanHeaderFeature"
					title={ title }
					tagLine={ tagLine }
					isPlaceholder={ isPlaceholder }
				/>,
				<HappinessSupport
					selectedSite={ selectedSite }
					key="hapinessSupportFeature"
					isPlaceholder={ isPlaceholder }
				/>
			];
		}
	}

	render() {
		const {
			plan,
			selectedSite,
			sitePlans,
			isPlaceholder
		} = this.props;

		const headerClasses = classNames( 'product-purchase-features__header', {
			'is-placeholder': isPlaceholder
		} );

		return (
			<div className="product-purchase-features">
				<div className={ headerClasses }>
					{ this.getPlanPurchaseHeader() }
				</div>
				<ProductPurchaseFeaturesList
					plan={ plan }
					selectedSite={ selectedSite }
					sitePlans={ sitePlans }
					isPlaceholder={ isPlaceholder }
				/>
			</div>
		);
	}
}

export default localize( PlanPurchaseFeatures );
