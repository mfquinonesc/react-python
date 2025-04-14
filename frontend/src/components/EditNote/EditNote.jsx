import { useState, forwardRef, useImperativeHandle, useEffect } from "react";

const EditNote = forwardRef(( { action = 'Create', currentNote = null , onSave = null } , ref) => {

  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState('');

  useEffect(()=>{
    if (action == "Read" && currentNote != null) {
      setTitle(currentNote.title ?? "");
      setContent(currentNote.content ?? "");
    }
  },[currentNote]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsActive(true);
    },
  }));

  const save = () => {

    if (onSave == null || onSave == undefined) {
      return;
    }

    let note = null;

    if (title.trim() != "" && content.trim() != "") {
      note = { title, content };
    }

    onSave(note);   
    setIsActive(false);
    setContent('');
    setTitle('');  
  };


  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">

            <header className="modal-card-head">
                <p className="modal-card-title">{`${action} Note`}</p>
                <button className="delete" aria-label="close" onClick={()=>setIsActive(false)}></button>
            </header>            
                      
            <form className="modal-card-body">
              <fieldset disabled={action == 'Read'}>

                <div className="field">
                    <label className="label">Title</label>
                    <input type="text" className="input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                <div className="field">
                    <label className="label">Content</label>
                    <textarea className="textarea" value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
                </div>

              </fieldset>
            </form> 
            
            <footer className="modal-card-foot">
                <div className="buttons">
                    <button className="button is-black" onClick={()=>save()}>Save</button>
                    <button className="button is-warning" onClick={()=>setIsActive(false)}>Cancel</button>
                </div>
            </footer>

        </div>
    </div>
  );

});

export default EditNote; 