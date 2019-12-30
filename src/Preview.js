import React from "react";
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';

class Preview extends TakeTblParent {
  constructor (props,context){

    super(props);
    this.tab="tables";
    this.headers={
      "en":{
        "Preview":"Preview"

      },
      "ru":{

      },
      "be":{

      }
    }
  }
  handleMerge = (event) =>{

    this.tab="merge";
    this.setState({tab:"merge"});

  }
  handleTables = (event) => {
    this.tab="tables";
    this.setState({tab:"table"});
  }
  handleClick = (event) =>{
    let content=this.props.floorplan();
    this.setState({"content":content,tables:this.props.tables(),sections:this.props.sections(),tab:"table"});

  }
  render(){
    let lang=this.state.lang;
    let headers=this.headers;
    let content ={__html:''};
    if (this.state.content){
      let previewNode = this.props.floorplan().cloneNode(true);
      content={__html:previewNode.innerHTML};
    }
    //let content = {__html: 'First &middot; Second'};
    let contents = content  && Array.from(content);
    let tables = this.state.tables;
    let sections = this.state.sections;
    let timeinfo = new Date().toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true });

    const styles = reactCSS({
      'default': {
        swatch: {
           width:"960px"
        },
      }
    });
    let temptables = [];
    tables.forEach(table=>{
      let temptable = {};
      if (table.state=='A' && table.tableno>0){
        temptable.seats = table.seats;
        temptable.tableno = table.tableno;
        temptable.date = table.date.toLocaleString('en-US', { hour: 'numeric',minute: 'numeric', hour12: true });
        temptable.section = table.section?table.section : 'N/A';
        temptables.push(temptable);
      }

    })

    return(
       <div className="preview"   view="group">
        <div className="dropdown">
         <button view="popup" onClick={this.handleClick} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-search-plus"></i>{headers[lang].Preview}
         </button>
         <div>
           <div>
              <div className="dropdown-menu preview "  aria-labelledby="dropdownMenu2" view="popup" >
                <form className="p-3 py-8" view="popup" noValidate>
                 <div view="popup" className="form-group form-group-sm">
                  <div className="tableth">
                      <div  className="tablettop"> </div>
                      <div className="previewContainer">
                          <div></div>
                          <div className="previewheader">
                            <div className="previewmenu">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="previewheading">{timeinfo}</div>
                          </div>
                          <div className="previewtab">
                               <div className="previewfloorplan" dangerouslySetInnerHTML={content}>

                               </div>
                               <div className="previewbottom"><ul className="previewfloorarea"><li className="previewfloorareatab">bar</li><li className="previewfloorareatab highlight">main</li><li className="previewbf">breakfast - 80</li><li className="previewln">lunch - 20 </li><li className="previewdr">dinner - 120</li></ul></div>
                          </div>
                          <div className="previewtablist" >

                               <div className="previewtablistheading">
                                 <div onClick={this.handleTables} >Tables</div><div onClick={this.handleMerge}>Merge</div>
                               </div>
                               <div id="tables" className={this.tab==='tables'? 'table-responsive' : 'previewhide'}>
                                <table className="table table-sm table-borderless">
                                  <thead className="previewtablistvaluesheading">
                                    <tr>
                                      <th >Sts</th><th>Sec</th><th>Tbl</th><th>Time</th>
                                  </tr>
                                  </thead>
                                  <tbody className="previewtablistvalues">
                                  {temptables.length>0 && temptables.map(t => (<tr className="Light" key={t.id}><td>{t.seats}</td><td>{t.section}</td><td>{t.tableno}</td><td>{t.date}</td></tr>))}
                                </tbody>
                               </table>
                              </div>
                              <div className="table-responsive previewhide">test</div>

                           </div>
                       </div>
                       <div className="tabletround"></div>
                  </div>
                 </div>
                </form>
               </div>
            </div>
          </div>
        </div>
       </div>
    );
  }
}
export default Preview
