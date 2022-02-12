import React,{useState,useEffect,setState} from 'react'
import "./Sidebar.css"
import FiberManuaRecordIcon from "@material-ui/icons/FiberManualRecord"
import CreateIcon from "@material-ui/icons/Create"
import SidebarOption from './SidebarOption'
import InsertCommentIcon from "@material-ui/icons/InsertComment"
import InboxIcon from "@material-ui/icons/Inbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from "@material-ui/icons/Add"
import db from './firebase'
import { useStateValue } from './StateProvider'
import {Avatar} from "@material-ui/core"



function Sidebar() {
    const[search,setSearch]=useState("")
    const[{user}]= useStateValue()
    const[inp,setInp]=useState("")
    const [channels, setChannels]=useState([])
    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot =>(
            setChannels(snapshot.docs.map(doc => 
                (
                    {
                        id: doc.id,
                        name: doc.data().name
                    }

                )
            
                ))
        ))

    },[])
    
   
    const filteredName = channels.filter(chanel =>{
      return  chanel.name.toLowerCase().includes(search.toLowerCase())
      
    })

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <Avatar src={user.photoURL}/>
                <h2>Logged In</h2>
                <h3>
                <FiberManuaRecordIcon />
                {user?.displayName}
                <div className="header__right">
                  
               </div>
                </h3>
                <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchIcon/>
                <input  placeholder="Search Channels" onChange={e => setSearch(e.target.value)} />
                </div>
                </div>
                </div>
                
                
                

            </div>
            
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel"/>
            {
                filteredName.map(channel =>(
                    <SidebarOption title={channel.name} id={channel.id}/>
                ))
            }

        
            

        </div>
    )
}

export default Sidebar
