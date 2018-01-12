import React from 'react';
import { Card, Content } from 'reactbulma';
import { List, Avatar, Input, Select, Button } from 'antd';
const Search = Input.Search;
const Option = Select.Option;
import brace from 'brace';
import AceEditor from 'react-ace';
 
import 'brace/mode/java';
import 'brace/theme/github';

function Editor(props) {

    return (
        <div className="project-part">
            <div style={{ margin: "10px 0" }}>
                <Select defaultValue="javascript" onChange={props.onLangChange}>
                    <Option value="javascript">javascript</Option>
                    <Option value="java">java</Option>
                    <Option value="python">python</Option>
                </Select>
                <Button type="primary" style={{ float: "right" }} onClick={props.run}>
                    Run
                </Button>
            </div>
            <AceEditor
                width="auto"
                height="550px"
                mode={props.language}
                theme="github"
                name="UNIQUE_ID_OF_DIV"
                value={props.code}
                onChange={props.onCodeChange}
                editorProps={{$blockScrolling: true}}
              />
        </div>
        
    )
}


export default Editor