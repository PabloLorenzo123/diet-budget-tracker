import { useState, useEffect } from "react";
import '../../styles/modal.css';
import { SearchCategories } from "../../constants";

const Modal = ({setShow, children}) => {

  const [searchCategory, setSearchCategory] = useState(SearchCategories[0]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      // Clean up by resetting overflow when the component unmounts
      return () => {
        document.body.style.overflow = 'auto';
      };
  }, []);

  return(
      <>
        
          <div className="modal-backdrop" onClick={() => setShow(false)}>
              <div className="custom-modal" onClick={e => e.stopPropagation()}>
                
                <div className="custom-modal-header mb-4">
                  <h4>Add Food to Diary</h4>
                </div>

                <div className="search-bar-container mb-2">
                  <div className="search-bar">
                    <span className="material-symbols-outlined search-icon">
                      search
                    </span>
                    <input type="search" placeholder="Search food" autoFocus/>
                  </div>
                  <button type="button" className="btn btn-primary">Search</button>
                </div>

                <div className="d-flex search-tabs mb-2">
                  {SearchCategories.map((item, idx) => {
                    return (
                    <div className={`search-tab${item == searchCategory? ' selected-tab': ''}`} key={item + 'tab'} onClick={() => setSearchCategory(item)}>
                      {item}
                    </div>
                  )})}
                </div>

                <div className="search-results">
                  <table className="table">
                    <colgroup>
                      <col style={{width: '90%'}}/>
                      <col style={{width: '10%'}}/>
                    </colgroup>
                    <thead>
                      <tr>
                        <th scop="col">Description</th>
                        <th scop="col">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Rice</td>
                        <td>USDA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
          </div>
        
      </>
  )
}

export default Modal;