import React from 'react';
import './Contact.css';

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xColor: '#fff',
    }
  }

  handleHover = () => {
    this.setState({ xColor: '#000' })
  }

  handleMouseLeave = () => {
    this.setState({ xColor: '#fff' })
  }

  render() {

    return(
      <div className="contact-container" style={{zIndex: this.props.show[0], backgroundColor: this.props.show[1]}}>
        <div className="contact-head-flex">
          <h2 className="contact-h2">Contact</h2>
          <div className="x" onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave} onClick={this.props.click}>
            <div className="line-x line1-x" style={{backgroundColor: this.state.xColor}}></div>
            <div className="line-x line2-x" style={{backgroundColor: this.state.xColor}}></div>
          </div>
        </div>
        <div className="contact-info">
          <div className="email">
            <i className="far fa-envelope contact-icon"></i>
            <p className="contact-info-text"><a href="mailto: ryanmthomas01@gmail.com" className="contact-info-text">ryanmthomas01@gmail.com</a></p>
          </div>
          <div className="phone">
            <i className="fas fa-phone contact-icon"></i>
            <p className="contact-info-text"><a href="tel:937-321-8714" className="contact-info-text">(937)-321-8714</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;

