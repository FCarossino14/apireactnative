import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Button, Grid, Col, Row} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const llamarAPI = () => {
  return fetch('http://www.omdbapi.com/?apikey=e4f4bf3e&t=school%20of%20rock')
    .then((response) => response.json())
    .catch((error) => { console.error(error);});
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Grid>
          <Col contentContainerStyle={{flex: 1}} style={{padding: 40}}>
                <Row style={{justifyContent: 'center', padding: 40} }>
                  <Text>imdb</Text>  
                </Row>

                <Row style={{justifyContent: 'center', padding: 10}}>
                <Button onPress={() => this.handlerClick()}>
                  <Text >Info pelicula</Text>
                    
                </Button>
                </Row>

                <Row style={{justifyContent: 'center'} }>
                <Text>
                  {(this.state.pelicula)} ({(this.state.duracion)})
                  </Text>
                </Row>
                <Row style={{justifyContent: 'center'} }>
                <Text>
                  ({(this.state.anio)})
                  </Text>
                </Row>
                <Row style={{justifyContent: 'center'} }>
                <Text>
                  Director: {(this.state.director)}
                  </Text>
                </Row>
              </Col>
          </Grid>
      </Container>


    );

    }
    

    handlerClick(){
      llamarAPI().then(peliculaExtraida=> {
        this.setState({pelicula: peliculaExtraida.Title,
        director: peliculaExtraida.Director,
        duracion: peliculaExtraida.Runtime,
        anio: peliculaExtraida.Year,
        genero: peliculaExtraida.Genre,
        sinopsis: peliculaExtraida.Plot,
        puntaje: peliculaExtraida.imdbRating});
      });
  }
  
}

/*
{"Title":"School of Rock",
"Year":"2003",
"Rated":"PG-13",
"Released":"03 Oct 2003",
"Runtime":"109 min",
"Genre":"Comedy, Music",
"Director":"Richard Linklater",
"Writer":"Mike White",
"Actors":"Jack Black, Adam Pascal, Lucas Papaelias, Chris Stack",
"Plot":"After being kicked out of his rock band, Dewey Finn becomes a substitute teacher of an uptight elementary private school, only to try and turn his class into a rock band.",
"Language":"English",
"Country":"USA, Germany",
"Awards":"Nominated for 1 Golden Globe. Another 8 wins & 22 nominations.",
"Poster":"https://m.media-amazon.com/images/M/MV5BMjEwOTMzNjYzMl5BMl5BanBnXkFtZTcwNjczMTQyMQ@@._V1_SX300.jpg",
"Ratings":[{"Source":"Internet Movie Database","Value":"7.1/10"},{"Source":"Rotten Tomatoes","Value":"91%"},{"Source":"Metacritic","Value":"82/100"}],
"Metascore":"82",
"imdbRating":"7.1",
"imdbVotes":"265,068",
"imdbID":"tt0332379",
"Type":"movie",
"DVD":"N/A",
"BoxOffice":"N/A",
"Production":"Paramount Pictures, Scott Rudin Productions",
"Website":"N/A",
"Response":"True"}
*/