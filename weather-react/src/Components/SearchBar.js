import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super()
		this.state = { value: '' }
	}

	handleValueChange = (e) => {
		this.setState({ value: e.target.value })
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.value === '') {
			return
		} else {
			this.props.city(this.state.value);
		}
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					value={this.state.value}
					onChange={this.handleValueChange}
					placeholder="Search for City..."
				 />
			</form>
		)
	}
};

export default SearchBar;