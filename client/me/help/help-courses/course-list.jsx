/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import Card from 'components/card';

export class CourseList extends Component {
	render() {
		return (
			<Card className="help-courses__course-list">
				Course list: visible to all
			</Card>
		);
	}
}

export const CourseListPlaceholder = () => {
	return <Card className="help-courses__course-list is-placeholder"></Card>;
};

export default localize( CourseList );
