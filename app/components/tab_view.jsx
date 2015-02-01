import React from 'react';
import R from 'ramda';

export let TabView = React.createClass({
    getInitialState: function () {
        return { selectedTabLabel: null };
    },
    componentWillMount: function () {
        this.setState({
            selectedTabLabel: R.head(this.props.children).props.label
        });
    },
    componentWillReceiveProps: function () {
        this.setState({
            selectedTabLabel: R.head(this.props.children).props.label
        });
    },
    render: function () {
        const tabs = this.props.children.map((child) => {
            const selectedTabLabel = this.state.selectedTabLabel;
            const childLabel = child.props.label;
            const isSelected = (childLabel === selectedTabLabel);

            return (
                <Tab
                    key={child.props.label}
                    label={child.props.label}
                    onClick={this._onClick}
                    tabPanel={child}
                    selected={isSelected} />
            );
        });

        const selectedPanel = R.find(
            (panel) => panel.props.label === this.state.selectedTabLabel,
            this.props.children);

        return (
            <div className="tab-view">
                <ul className="tab-view-tabs">{tabs}</ul>
                <div>{selectedPanel}</div>
            </div>
        );
    },

    _onClick: function (tab) {
        this.setState({
            selectedTabLabel: tab.props.tabPanel.props.label
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
        return <div className="tab-panel">{this.props.children}</div>;
    }
});