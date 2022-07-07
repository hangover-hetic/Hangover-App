import React from 'react';
import {baseUrl} from '../api/client';
import {client} from '../api/client';
import Paragraph from '../components/semantics/Paragraph';
import Title from '../components/semantics/Title';
import Container from '../components/ui/Container';

class Program extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            festival: {
                name: null,
                artists: [
                    {name: 'Deen burbigo'},
                    {name: 'Wit'},
                    {name: 'Alpha wann'},
                    {name: 'Booba'},
                ],
            },

        };
    }

    componentDidMount() {
        const url = baseUrl.concat(`festival/${this.props.festivalId}`);
        
        client.get(url).then((festival) => {
            this.state.festival = festival;
        });

    }

    render() {
        return <>
            <Container>
                <Title content={'Programmation'}/>
                <Paragraph content={this.state.festival.name}/>
            </Container>
        </>;
    }
}

export default Program;
