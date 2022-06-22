import React from "react";
import styled from 'styled-components'
import { NavLink } from "react-router-dom";
import { CreateTable } from "../Shared/Table";
import axios from "axios";
const getUsers = () => (axios.get(`http://localhost:3000/api/projects/users`).then(res => res.data));
const promoteRequest = (UID) => (axios.post(`http://localhost:3000/api/projects/promote`, UID).then(res => res.data));
const demoteRequest = (UID) => (axios.post(`http://localhost:3000/api/demote`, UID).then(res => res.data));

const StingText = `🐝 Buzzzzz
You’ve been stung to update something on Buzz! Take a look at https://buzz.dailybruin.com.`;

class AdminPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    this.transformData = this.transformData.bind(this);
    this.tagline = this.tagline.bind(this);
    this.sting = this.sting.bind(this);
    this.promote = this.promote.bind(this);
    this.demote = this.demote.bind(this); 
  }

  componentDidMount() {
    getUsers().then(res => {
      console.log(res);
      const data = this.transformData(res);
      this.setState({
        data,
        loading: false
      })
    })
  }

  tagline(someone) {
    if (someone.twitter && someone.twitter!="") {
      return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com or tweet @${someone.twitter}.`
    }
    return `Email ${someone.lastName} at ${someone.slug}@dailybruin.com.`
  }

  transformData(data) {
    return data.allUsers.map(x => ({
      email: x.email,
      userId: x._id
    }))
  }

  promote(someone){
    console.log('you just got promoted! :P')
    console.log(someone)
    promoteRequest({id: someone}).then(data => console.log(data))
    window.location.reload()
  }

  demote(someone){
    console.log('you just got demoted~ :(')
    console.log(someone)
    demoteRequest({id: someone}).then(data => console.log(data))
    window.location.reload()
  }

  sting(someone) {
    stingMember(someone._id);
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <>
        <h1 style={{margin: '1em'}}>Admin Page</h1>
        <Button> <NavLink style={{textDecoration: 'none', color: 'black'}} to='/'> Home </NavLink> </Button>
        <h2 style={{margin: '1.2em'}}>Staff List</h2>
        <div style={{margin: '1.7em'}}>
          {CreateTable(this.state.data, ["email"], this.promote, undefined, this.demote)}
          </div>
      </>
    )
  }
}

const Button = styled.button`
   background-color: white;
   color: black;
   padding: 1em;
   cursor: pointer;
   margin-left: 2em;
`

export default AdminPage; 