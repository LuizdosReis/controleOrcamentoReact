import React, { Component } from 'react';

export default class ButtonCustomizado extends Component{

    render(){
        return (
            <button type="submit" className="pure-button pure-button-primary">{this.props.label}</button>
        );
    }
}