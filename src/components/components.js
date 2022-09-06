import React from 'react';
import uniqid from "uniqid"
class Input extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <input type={this.props.type} placeholder={this.props.place} className={this.props.id}></input>
        )
    }
}
class Dateinput extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <input type={this.props.type} className={this.props.id} placeholder={this.props.place} id='date' defaultValue='0'></input>
        )
    }
}

class General extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='general'>
                <Input place="Name" type="text" id="name"/>
                <Input place="Email" type="email" id="email"/>
                <Input place="Phone Number" type="text" id="phone"/>
            </div>
        )
    }
}
class School extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='section'>
                <div className='remove' onClick={()=> this.props.remove(this.props.id)}>x</div>
                <Input place="School Name" type="text" id={this.props.id} />
                <Input place="Course Name" type="text" id={this.props.id} />
                <div className='dates'>
                <Dateinput type="date" id={this.props.id} />
                <Dateinput type="number" place='Years' id={this.props.id} />
                </div>
            </div>
        )
    }
}
class Schoolsection extends React.Component{
    constructor(props){
        super(props)
        this.state = { id : []}
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
    }
    add(){
        let newid = uniqid()
        this.setState({
            id : [...this.state.id, newid]
    })
    this.props.change({school : [...this.state.id, newid], work : this.props.work})
    }
    remove(key){
        let update = this.state.id.filter((id)=>{
            return id !== key
        })
        this.setState({id : update})
        this.props.change({school : update, work : this.props.work})
    }
    render(){
        return(
            <div className='section'>
                {this.state.id.map((value,index)=>{
                    return <School key={value} remove ={this.remove} id={value} />
                })}
               <button onClick={this.add}>+</button>
            </div>
        )
    }
}
class Work extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='section'>
                <div className='remove' onClick={()=> this.props.remove(this.props.id)}>x</div>
                <Input place="Company Name" type="text" id={this.props.id}/>
                <Input place="Position Name" type="text" id={this.props.id}/>
                <div className='dates'>
                <Dateinput type="date" id={this.props.id}/>
                <Dateinput type="number" place='Years' id={this.props.id}/>
                </div>
            </div>
        )
    }
}
class Worksection extends React.Component{
    constructor(props){
        super(props)
        this.state = { id : []}
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
    }
    add(){
        let newid = uniqid()
        this.setState({
            id : [...this.state.id, newid]
    })
    this.props.change({work : [...this.state.id, newid], school : this.props.school})
    }
    remove(key){
        let update = this.state.id.filter((id)=>{
            return id !== key
        })
        this.setState({id : update})
        this.props.change({work : update, school : this.props.school})
    }
    render(){
        return(
            <div className='section'>
                {this.state.id.map((value,index)=>{
                    return <Work key={value} remove ={this.remove} id={value} />
                })}
               <button onClick={this.add}>+</button>
            </div>
        )
    }
}
class Profile extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='general2'>
              <div className='profile'></div>
              <div className='profile'></div>
              <div className='profile'></div>
            </div>
        )
    }
}
class Text extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div id={this.props.name}>
            </div>
        )
}
}
class SchoolProfile extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='general2'>
                {this.props.school.map((id)=>{
                    return (
                    <div key={id}>
                    <Text name={id} key='name'/>
                    <Text name={id} key='course'/>
                    <Text name={id} key='start'/>
                    <Text name={id} key='duration'/>
                    </div>
                    )
                })}
            </div>
        )
    }
}
class Workprofile extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='general2'>
                {this.props.work.map((id)=>{
                    return (
                    <div key={id}>
                    <Text name={id} key='name'/>
                    <Text name={id} key='course'/>
                    <Text name={id} key='start'/>
                    <Text name={id} key='duration'/>
                    </div>
                    )
                })}
            </div>
        )
    }
}
class Cv extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='cv'>
              <h1>Profile</h1>
              <Profile/>
              <h2>Schools</h2>
              <SchoolProfile school={this.props.school}/>
              <h2>Work</h2>
              <Workprofile work={this.props.work}/>
              <div className='description'></div>
              <button id='finish' onClick={()=>{
                const app = document.querySelector('.App')
                const cv = document.querySelector('.cv')
                app.style.display = "flex"
                cv.style.display = 'none'
              }} >Edit</button>
            </div>
        )
    }
}
class Button extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <button id='finish' onClick={()=>{
                this.props.update()
                console.log(this.props.data.school)
                this.props.data.school.map((value)=>{
                    const form = document.querySelectorAll(`.${value}`)
                    const profile =document.querySelectorAll(`#${value}`)
                    profile[0].textContent = form[0].value
                    profile[1].textContent = form[1].value
                    profile[2].textContent = 'Start: ' + form[2].value
                    profile[3].textContent = form[3].value + ' year'
                })
                this.props.data.work.map((value)=>{
                    const form = document.querySelectorAll(`.${value}`)
                    const profile =document.querySelectorAll(`#${value}`)
                    profile[0].textContent = form[0].value
                    profile[1].textContent = form[1].value
                    profile[2].textContent = 'Start: ' + form[2].value
                    profile[3].textContent = form[3].value + ' year'
                })
                const des = document.querySelector('textarea')
                const desprofile = document.querySelector('.description')
                desprofile.textContent = 'description: ' + des.value
            }}>Finish</button>
        )
    }
}
export {General, Schoolsection, Worksection, Cv, Button}