import React, { Component } from 'react'
import '../style/contactForm.css'

class ContactForm extends Component{
    state = { 
        lastname:'votre nom ici',
        firstname:'votre prénom ici',
        mail:'votre mail ici',
        phone:'votre numéro de téléphone ici',
        objet:'pro',
        message:'taper votre message ici'
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        console.log('Le nom est : ' + this.state.lastname)
        console.log('Le prénom est : ' + this.state.firstname)
        console.log('Le mail est : ' + this.state.mail)
        console.log('Le tél est : ' + this.state.phone)
        console.log('L objet du contact est : ' + this.state.objet)
        console.log('le message est : ' + this.state.message)
        e.preventDefault()
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="contactFormLine">
                    <label>
                    Nom :
                        <input 
                            id="lastname"
                            type="text" 
                            value={this.state.lastname} 
                            onChange={this.handleChange}  />
                    </label>
                    <label>
                    Prénom :
                        <input 
                            id="firstname"
                            type="text" 
                            value={this.state.firstname} 
                            onChange={this.handleChange}  /> 
                    </label>
                </div>
                <div className="contactFormLine">
                    <label>
                    téléphone :
                        <input 
                            id="phone"
                            type="text" 
                            value={this.state.phone} 
                            onChange={this.handleChange}  />
                    </label>
                    <label>
                    Mail :
                        <input 
                            id="mail"
                            type="text" 
                            value={this.state.mail} 
                            onChange={this.handleChange}  />
                    </label>
                </div>
                <div className="contactFormLine">
                    <label>
                        Objet :
                        <select 
                            id="objet"
                            value={this.state.objet} 
                            onChange={this.handleChange}>
                                <option value="pro">shooting pro</option>
                                <option value="mariage">mariage</option>
                                <option value="famille">famille</option>
                                <option value="autre">autre</option>
                        </select>
                    </label>
                    </div>
                    <div className="contactFormLine">
                    <label>
                        Message :
                        <br/>
                        <textarea 
                            id="message"
                            value={this.state.message} 
                            onChange={this.handleChange} />
                    </label>
                </div>
                
                <input type="submit" value="Envoyer" />
        </form>
        )
    }
}

export default ContactForm
