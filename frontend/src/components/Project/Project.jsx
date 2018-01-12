import React, { Component } from 'react';
import { Row, Col, Alert } from 'antd';
import axios from 'axios';
import Editor from './Editor';
import Users from './Users';
import './project.css';

class Project extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ws: null,
            messages: [],
            users: [],
            code: "",
            language: "javascript",
            result: null,
            error: null
        }

        this.addMessage = this.addMessage.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onError = this.onError.bind(this);
        this.onLangChange = this.onLangChange.bind(this);
        this.run = this.run.bind(this);
    }

    componentDidMount() {
        const ws = new WebSocket(`ws://${location.host}/ws/edit`);
        ws.onmessage = this.onMessage;
        ws.onclose = this.onClose;
        ws.onerror = this.onError;
        this.setState({ws});
    }

    componentWillUnmount() {
        this.state.ws.close();
    }
    
    addMessage(message) {
        let messages = this.state.messages.concat([message]);
        this.setState({ messages });
    }

    onMessage(event) {
        const message = JSON.parse(event.data);
        if (message.type === 'list') {
            this.setState({
                users: message.data
            });
        } else if (message.type === 'join') {
            let users = this.state.users.concat([message.user]);
            this.setState({ users });
            // this.addMessage(message);
        } else if (message.type === 'left') {
            let users = this.state.users.slice();
            users = users.filter(user => user.username !== message.user.username);
            this.setState({ users });
            // this.addMessage(message);
        } else if (message.type === 'code') {
            this.setState({
                code: message.data
            });
        }
    }

    onClose(event) {
        this.setState({
            error: '[DISCONNECTED] ' + event.code
        });
    }

    onError(code, message) {
        this.setState({
            error: '[ERROR] ' + code + ': ' + message
        });
    }

    onLangChange(language) {
        this.setState({language});
        if (language === "java") {
            const code = `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`;
            this.setState({code});
        }
    }

    async run() {
        try {
            let reseponse = await axios.post('/api/code', {
                language: this.state.language,
                code: this.state.code
            });
            let { build, run } = reseponse.data;
            if (run !== "N/A") {
                this.setState({
                    result: run,
                    error: null
                })
            } else {
                this.setState({
                    result: null,
                    error: build
                })
            }
        } catch(error) {
            let { code, message } = error.response.data;
            this.onError(code, message);
        }
    }

    render() {
        return (
            <div className="container" style={{ margin: "30px auto" }}>
                { this.state.result && <Alert message={ this.state.result } type="success" showIcon style={{ margin: "10px 0" }}/> } 
                { this.state.error && <Alert message={ this.state.error } type="error" showIcon style={{ margin: "10px 0" }}/> } 
                <Row type="flex" justify="space-between">
                    <Col xs={24} sm={19} md={19} lg={19} xl={19}>
                        <Editor 
                            language={this.state.language} 
                            code={this.state.code} 
                            onLangChange={this.onLangChange}
                            onCodeChange={(code) => this.state.ws.send(code)}
                            run={this.run}
                        />
                    </Col>
                    <Col xs={24} sm={5} md={5} lg={5} xl={5}>
                        <Users users={this.state.users}/>
                    </Col> 
                </Row>
            </div>
        );
    }
}

export default Project;