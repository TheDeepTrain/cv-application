import React from 'react';
import { General, Schoolsection, Worksection, Cv, Button } from './components/components';
import './App.css';

function updateprofile(){
  const name = document.querySelector('.name')
  const email = document.querySelector('.email')
  const phone = document.querySelector('.phone')
  const profiles = document.querySelectorAll('.profile')
  profiles[0].textContent = 'Name: ' + name.value
  profiles[1].textContent = 'Email: ' + email.value
  profiles[2].textContent = 'Phone Number: ' + phone.value
}
function update(){
  const app =document.querySelector('.App')
  const cv = document.querySelector('.cv')
  updateprofile()
  app.style.display = 'none'
  cv.style.display = 'flex'
}
class App extends React.Component{
  constructor(props){
  super(props)
  this.state = {school: [], work : []}
  this.change = this.change.bind(this)
  }
  change(value){
    this.setState(value)
  }
  render(){
  return (
    <div className='container'>
      <div className='space'></div>
     <div className="App">
       <h1>CV application</h1>
       <General/>
       <h2>School experiences</h2>
       <div className='school'>
        <Schoolsection change={this.change} work={this.state.work}/>
       </div>
       <h2>Work experiences</h2>
       <div className='school'>
        <Worksection change={this.change} school={this.state.school} />
       </div>
       <textarea placeholder='Enter your description'></textarea>
       <Button update={update} data={this.state} />
     </div>
      <Cv school={this.state.school} work={this.state.work} />
     <div className='space'></div>
    </div>
  )}
}

export default App;
