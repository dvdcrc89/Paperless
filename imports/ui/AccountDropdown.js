import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown/lib/components/Dropdown.js';

class AccountDropdown extends Component {
    constructor (props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick () {
        this.refs.dropdown.hide();
    }

    render () {
        const { user } = this.props;

        return (
            <div id="menuContainer">
            <Dropdown className="account-dropdown" ref="dropdown">
                <DropdownTrigger>
                    <img className="account-dropdown__name" src='./img/menu.png'></img>
                </DropdownTrigger>
                <DropdownContent>
                    <div className="account-dropdown__identity account-dropdown__segment">
                        Signed in as <strong>{user.name}</strong>
                        <img className="account-dropdown__avatar" src={user.avatar_url} ></img>

                    </div>
                    <ul className="account-dropdown__quick-links account-dropdown__segment">
                        <li className="account-dropdown__link">
                            <a className="account-dropdown__link__anchor" href="#" onClick={this.handleLinkClick}>
                                Your profile
                            </a>
                        </li>
                        <li className="account-dropdown__link">
                            <a className="account-dropdown__link__anchor" href="#" onClick={this.handleLinkClick}>
                                Your stars
                            </a>
                        </li>
                        <li className="account-dropdown__link">
                            <a className="account-dropdown__link__anchor" href="#" onClick={this.handleLinkClick}>
                                Explore
                            </a>
                        </li>
                        <li className="account-dropdown__link">
                            <a className="account-dropdown__link__anchor" href="#" onClick={this.handleLinkClick}>
                                Help
                            </a>
                        </li>
                    </ul>
                    <ul className="account-dropdown__management-links account-dropdown__segment">
                        <li className="account-dropdown__link">
                            <a className="account-dropdown__link__anchor" href="#" onClick={this.handleLinkClick}>
                                Settings
                            </a>
                        </li>
                        <li className="account-dropdown__link">
                            <a className="account-dropdown__link__anchor" href="#" onClick={this.handleLinkClick}>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
            </div>
        );
    }
}

AccountDropdown.propTypes = {
    user: PropTypes.object.isRequired
};

export default AccountDropdown;