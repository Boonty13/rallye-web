import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { serverUrl } from '../tools/globalVariables'
import CardNews from '../components/CardNews'
import { Container, Row, Button } from 'reactstrap';

function News(props) {
  props.changeScreen('Actualités du rallye')

  const [newsList, setNewsList] = useState([])

  useEffect(() => {

    async function getNews() {
      const rawAnswer = await fetch(`${serverUrl}/news/get-news`, {
        method: 'GET',
      });
      let allNews = await rawAnswer.json();
      setNewsList(allNews.news)
    }
    getNews()
  }, [])


  // Show news
  const news = newsList.map((news) => {
    return <CardNews key={news._id} infoNews={news} ></CardNews>
  })

  return (

    <Container fluid style={{
      backgroundColor: "#fd9644",
      margin: 0,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '3%',
      height: '100vh'
    }}>
      <Row>
        {news}
      </Row>

    </Container>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function (screen) {
      dispatch({ type: 'changeScreen', screen })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(News);
