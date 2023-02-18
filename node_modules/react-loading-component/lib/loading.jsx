/**
 * Created by daisy on 15/7/13.
 */
var React = require('react');
var loading = module.exports = React.createClass({
    propTypes: {
        data: React.PropTypes.object,
        require: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object//{key: default}
        ])
    },
    isLoading: function () {
        if (typeof this.props.require === 'string') {
            return !this.props.data.hasOwnProperty(this.props.require);
        }
        if (Array.isArray(this.props.require)) {
            for (var index in this.props.require) {
                if (!this.props.require.hasOwnProperty(index)) {
                    continue;
                }
                if (!this.props.data.hasOwnProperty(this.props.require[index])) {
                    return true;
                }
            }
            return false;
        }
        for (var key in this.props.require) {
            if (!this.props.require.hasOwnProperty(key)) {
                continue;
            }
            if (!this.props.data.hasOwnProperty(key) || this.props.data[key] === this.props.require[key]) {
                return true;
            }
        }
        return false;
    },
    render() {
        var content = this.props.content ? this.props.content : '正在加载中...';
        return this.isLoading() ? (
            <span>{content}</span>
        ) : this.props.children;
    }
});