import axios from "axios";
import React, { useEffect } from "react";
import { Badge, Card, Col, Container, Image, Row, Spinner, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { baseUrlPokemon } from "../utils";

export default function PokeDetailPage() {
  const [pokemon, setPokemon] = React.useState({});
  const [abilities, setAbilities] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { id } = useParams();

  const previousLink = id === 1 ? `../1` : `../${parseInt(id) - 1}`;
  const nextLink = id === 905 ? `../905` : `../${parseInt(id)+1}`;

  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  async function getPokemonById(id) {
    setLoading(true);
    const reqPokemon = axios.get(`${baseUrlPokemon}/${id}`);
    try {
      const res = await reqPokemon;
      const dataPokemon = res.data;
      setPokemon(dataPokemon);
      // Map abilities
      dataPokemon.abilities.map(async (ability,index) => {
        await getAbilityById(ability.ability.url, index);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getAbilityById(url) {
    const reqAbility = axios.get(url)
    try {
      const res = await reqAbility;
      const dataAbility = res.data;
      setAbilities(dataAbility);
      // setPokemon((prev) => ({ ...prev, abilities: dataAbility }));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="bg-white rounded p-3 mt-2">
      {loading ? (
        <>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span>SENGAJA LOADINGNYA DITAMBAH SATU DETIK HIHI...</span>
        </>
      ) : (
        <>
        <Stack direction="horizontal">
          <Link className="btn btn-info me-auto" to={previousLink}> Previous</Link>
          <Link className="btn btn-info" to={nextLink}>Next</Link>
        </Stack>
        <Row className="my-2">
          <h1 className="text-center text-capitalize mb-4">
            {pokemon.name} #0{pokemon.id}
          </h1>
          <Col xs={5}>
            <Image
              fluid
              rounded
              className="bg-light"
              src={pokemon.sprites?.other["official-artwork"].front_default}
              alt="pokemon"
            />
          </Col>
          <Col xs>
            {
              pokemon.abilities.map((ability, index) => (
                <h5 key={index} className=" mb-0 text-capitalize">
                  Skill {index+1}: <dfn>{ability.ability.name}</dfn>
                </h5>
              ))
            }
            <h5 className=" mb-0 text-capitalize mt-2">
              Skill Pasif: <dfn>{abilities.names[7].name}</dfn>
            </h5>
            <p className="mb-4">{abilities.effect_entries[1].effect}</p>
            <Card style={{ backgroundColor: "#21A7D7" }} className="text-white mb-3">
              <Card.Body>
                  <Row>
                    <Col>
                      <h5 className="text-capitalize fw-normal">Height</h5>
                      <p className="text-capitalize h6-plus text-dark fw-semibold">{pokemon.height} ft</p>
                      <h5 className="text-capitalize fw-normal">weight</h5>
                      <p className="text-capitalize h6-plus text-dark fw-semibold">{pokemon.weight} lbs</p>
                    </Col>
                    <Col>
                    <h5 className="text-capitalize fw-normal">category</h5>
                    <Stack direction="horizontal">

                    {
                      pokemon.types.map((type, index) => (
                        <Badge key={index} pill className={"text-capitalize text-dark fw-semibold me-2 fs-6 " + type.type.name}>{type.type.name}</Badge>
                        ))
                      }
                      </Stack>
                    </Col>
                  </Row>
              </Card.Body>
            </Card>
          </Col>
          {/* mau Ambil skillnya names[7].name */}
        </Row>
        </>
      )}
    </Container>
  );
}
