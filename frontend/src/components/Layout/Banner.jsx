import React from 'react'
import { Hero, Container, Title, SubTitle } from 'reactbulma'

function Banner(props) {
    return (
        <Hero info>
          <Hero.Body>
            <Container>
              <Title>
                Collaborative Online Judger
              </Title>
              <SubTitle>
                Based on WebSocket and Docker
              </SubTitle>
            </Container>
          </Hero.Body>
        </Hero>
    )
}


export default Banner