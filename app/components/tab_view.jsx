import React from 'react';
import R from 'ramda';

export let TabView = React.createClass({
    componentWillMount: function () {
        this.setState({
            selectedTab: R.head(this.props.children)
        });
    },
    render: function () {
        const tabs = this.props.children.map((child) => {
            const isSelected = (
                this.state.selectedTab.props.label === child.props.label);

            return (
                <Tab
                    label={child.props.label}
                    onClick={this._onClick}
                    tabPanel={child}
                    selected={isSelected} />
            );
        });

        return (
            <div className="tab-view">
                <ul className="tab-view-tabs">{tabs}</ul>
                <div>{this.state.selectedTab}</div>
            </div>
        );
    },

    _onClick: function (tab) {
        this.setState({
            selectedTab: tab.props.tabPanel
        });
    }
});

export let Tab = React.createClass({
    render: function () {
        const className = React.addons.classSet({
            "tab-view-tab": true,
            "selected": this.props.selected
        });

        return (
            <li className={className}
                onClick={this._onClick}>{this.props.label}</li>
        );
    },
    _onClick: function () {
        return this.props.onClick(this);
    }
});

export let TabPanel = React.createClass({
    render: function () {
        return <div>{this.props.children}</div>;
    }
});