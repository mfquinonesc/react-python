import { useState, useEffect, useRef } from 'react'; 
import api from '../../api.js';
import EditNote from '../../components/EditNote/EditNote.jsx';


export default function Home(){

    const editNoteRef = useRef();

    const [notes, setNotes] = useState([]);
    const [copyNotes, setCopyNotes] = useState([]);
    const [searchText, setSearchText]  = useState('');
    const [currentNote,  setCurrentNote] = useState(null);
    const [action, setAction] = useState('Create');

    useEffect(()=>{
        getNotes();         
    },[notes]);

    const getNotes = () => {
        api.get('/api/notes/')
        .then(res => res.data)
        .then(data => {
            setNotes(data);
            filterNotes();       
        })
        .catch(err => alert (err))
    }

    const createNote = (note) => {       
        if(note != null && note != undefined){
            api.post('/api/notes/',note)
            .then(res =>{
                if (res.status === 201) console.log("Note created");
                else alert('Fail to make note');
            })
            .catch(err => alert(err))
            .finally(getNotes())
        }   
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then((res) => {
          if (res.status === 204) console.log("Note deleted");
          else alert("Fail to delete note.");
        })
        .catch((err) => alert(err))
        .finally(getNotes());     
    };

    const open = () => {
        editNoteRef.current.open();
    }

    const filterNotes = () => {
        if(searchText.trim() != ''){
            const filtered = notes.filter((note) => {
              return note.title.toUpperCase().includes(searchText.toUpperCase());
            });
            setCopyNotes(filtered)
        }
        else {
            setCopyNotes(notes);
        }        
    }

    const readNote = (note) =>{
        setAction('Read');
        setCurrentNote(note);
        open();
    }
     
    return (
    <>        
        <section className='hero is-fullheight-with-navbar'>
            <div className='hero-body is-flex is-flex-direction-row is-align-items-start'>
                <div className="container">

                    <div className='columns'>

                        <aside className="column is-2">
                            <div className="menu is-warning">
                                <ul className="menu-list">
                                    <li>
                                        <a onClick={()=>open()}>
                                            <span className="icon"><i className="fa-solid fa-square-plus"></i></span>
                                            New
                                        </a>
                                    </li>                                    
                                </ul>
                            </div>
                        </aside>

                        <div className="column is-10">
                            <article className="panel is-warning">

                                <div className="panel-block">
                                    <p className="control has-icons-left">
                                        <input className="input is-warning" type="text" placeholder="Search" value={searchText} onChange={(e)=> setSearchText(e.target.value)}/>
                                        <span className="icon is-left">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </span>
                                    </p>
                                </div>

                                {copyNotes.map((note, index)=>{ return(
                                    <div key={index} className="panel-block is-flex is-flex-direction-row is-justify-content-space-between">
                                        <a className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center has-text-current"
                                            onClick={()=>readNote(note)}
                                        >
                                            <span className="panel-icon">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            {note.title}     
                                        </a>                                                                     
                                       
                                        <a className='panel-icon' onClick={(e)=>deleteNote(note.id)}><i className="fa-solid fa-trash"></i></a>                                       
                                    </div>);                                    
                                })}     

                            </article>      
                        </div>

                    </div>      
                    
                </div>               
            </div>
        </section>

        <EditNote ref={editNoteRef} action={action}  currentNote={currentNote}  onSave={(note)=> createNote(note)}></EditNote>
    </>
    );
}
