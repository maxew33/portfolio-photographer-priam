import React, { Component } from 'react'
import '../style/contactForm.css'

class ContactForm extends Component{
    state = { 
        lastname:'',
        firstname:'',
        mail:'',
        phone:'',
        objet:'',
        message:''
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
            <div className="form-container">
               <form onSubmit={this.handleSubmit}>
                    <div className="form-input-container">
                        <svg viewBox="0 0 73.554 79.375"className="form-bg">
                            <g transform="matrix(1.0958 0 0 1.09 -95.234 -206.81)" >
                                <g>
                                    <path d="m153.41 250.63-8.9535-18.842-6.0136-16.838s-4.1392-5.0502-7.0826-6.0136c-1.7826-0.58346-5.6127 0.4009-5.6127 0.4009l-3.3409 0.93544-1.0691-3.3409 1.2027-3.0736-0.13364-3.0736-0.93544-0.66818s-0.942-4.1715-2.1382-5.8799c-1.0337-1.4764-2.4421-2.8776-4.1427-3.4745-1.8498-0.64934-4.0322-0.52158-5.8799 0.13363-1.646 0.58365-3.1324 1.7827-4.1427 3.2072-0.89636 1.2639-1.2728 2.873-1.47 4.41-0.0852 0.66421 0.13363 2.0045 0.13363 2.0045l-2.5391 0.53454-3.7418-2.8063-3.4745-3.3409-4.2763-0.66818-0.26727 3.7418-2.0045 2.1382 1.8708 4.8096-0.80181 3.7418 1.8709 7.7508-1.2027 6.2808s-1.9058 10.037-1.7373 15.101c0.10697 3.2135-0.45463 7.1357 1.7373 9.4881 1.0974 1.1778 3.0871 1.4535 4.6772 1.2027 3.125-0.4929 8.0181-5.0781 8.0181-5.0781l5.2118-5.479 2.0045 1.8709 2.6727 2.8063-0.40091 3.6081s-2.9735 0.82096-4.009 1.8709c-1.3721 1.3911-2.378 3.3917-2.4054 5.3454-0.0162 1.1581 0.92613 2.1242 1.3364 3.2072 0.65862 1.7389 1.8041 5.2786 1.8041 5.2786"/>
                                    <path d="m96.217 219.09-0.13364 7.3499 1.0691 5.7463 3.4745-6.949-1.3364-4.41-3.0736-1.7372-1.0691-1.5368-4.4768-5.8799 1.0023-3.5413-2.2718-3.2072"/>
                                    <path d="m103.83 200.52 0.13363 15.635 2.5391 3.8754 4.2763-1.0691-0.80181-1.47-2.1382-1.2027-4.009-9.4881"/>
                                    <path d="m109.98 217.49 6.4145-1.7372 2.3386-4.0759"/>
                                    <path d="m89.402 204.93 4.9445 0.80181 2.94 2.6727 3.6081 0.0668 0.66817-2.2718-0.26727-5.1449"/>
                                    <path d="m132.63 233.32-10.557 14.098-7.4167-1.6036-2.8063-3.2072"/>
                                    <path d="m100.63 225.24 6.5481 12.695"/>
                                    <path d="m106.51 220.03s3.9139 5.8874 6.6149 8.0849c1.7928 1.4586 6.1472 3.2072 6.1472 3.2072l1.0691 3.5413"/>
                                </g>
                                <path d="m103.41 201.93 3.6659-0.11447-2.4388 6.7486"/>
                            </g>
                        </svg>
                        <div className="form-input">
                            <input 
                                id="lastname"
                                type="text"
                                required
                                value={this.state.lastname}
                                onChange={this.handleChange}/>
                            <label>
                            Nom :
                            </label>
                        </div>
                        <div className="form-input">
                            <input
                                id="firstname"
                                type="text"
                                required
                                value={this.state.firstname}
                                onChange={this.handleChange}/>
                            <label>
                            Prénom :
                            </label>
                        </div>
                        <div className="form-input">
                            <input 
                                id="phone"
                                type="text"
                                required
                                value={this.state.phone}
                                onChange={this.handleChange}/>
                            <label>
                            Téléphone :
                            </label>
                        </div>
                        <div className="form-input">
                            <input 
                                id="mail"
                                type="email"
                                required 
                                value={this.state.mail} 
                                onChange={this.handleChange}  />
                            <label>
                            Mail :
                            </label>
                        </div>
                        <div className="form-input">
                            <select 
                                id="objet"
                                required
                                value={this.state.objet}
                                onChange={this.handleChange}>
                                    <option value=""></option>
                                    <option value="pro">Shooting pro</option>
                                    <option value="mariage">Mariage</option>
                                    <option value="famille">Famille</option>
                                    <option value="autre">Autre</option>
                            </select>
                            <label>
                                Objet :
                            </label>
                        </div>
                        <div className="form-input">
                            <textarea
                                id="message"
                                required
                                value={this.state.message}
                                onChange={this.handleChange} />
                            <label>
                                Message :
                            </label>
                        </div>
                    </div>                
                    <input
                        className="submit-button"
                        type="submit" 
                        value="Envoyer" />
                        </form>
            </div>
        )
    }
}

export default ContactForm
