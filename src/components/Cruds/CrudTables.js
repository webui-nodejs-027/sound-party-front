import React, {useEffect, useState} from 'react';
import Dialog from './Dialog';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button/Button";
import {makeStyles} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    blue: {
        color: "blue",
        fontWeight: "bold",
        marginTop: '15px',
    },
    crudHeader : {
        textAlign : 'center',
        marginTop : '15px',
    }
});

export default function CrudTables() {
    const classes = useStyles();

    const [genres, setGenres] = useState({
        genres: [],
        tableName: 'genres',
    });
    const [authors, setAuthors] = useState({
        authors: [],
        tableName: 'authors',
    });
    const [cities, setCities] = useState({
        cities: [],
        tableName: 'cities',
    });

    const getAllGenres = async () => {
        const responseGenres = await fetch('http://localhost:3001/api/genres');
        const genres = await responseGenres.json();
        return genres;
    };

    const getAllAuthors = async () => {
        const responseAuthors = await fetch('http://localhost:3001/api/authors');
        const authors = await responseAuthors.json();
        return authors;
    };

    const getAllCities = async () => {
        const responseCities = await fetch(`http://localhost:3001/api/cities`);
        const fCities = await responseCities.json();
        return fCities;
    };

    const updateAllTables = async () => {
        const cities = await getAllCities();
        const authors = await getAllAuthors();
        const genres = await getAllGenres();
        setCities({
            cities: cities.data,
            tableName: 'cities'
        });
        setAuthors({
            authors: authors.data,
            tableName: 'authors'
        });
        setGenres({
            genres: genres.data,
            tableName: 'genres'
        });

    };

    useEffect(() => {
        (async () => {
            await updateAllTables();
        })();
    }, []);

    async function insertInTable(value, tableName) {
        try {
            const data = {
                name: value.toString(),
            };
            const response = await fetch(`http://localhost:3001/api/${tableName}`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            await updateAllTables();
        } catch (e) {
            console.log(e);
        }
    }

    async function updateInTable(value, tableName) {
        try {
            const body = JSON.stringify({
                name: value.name.toString(),
            });
            if (value.id) {
                const response = await fetch(`http://localhost:3001/api/${tableName}/${value.id}`, {
                    method: "PUT",
                    body
                });
            }
            await updateAllTables();
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteFromTable(id, tableName) {
        try {
            const response = await fetch(`http://localhost:3001/api/${tableName}/${id}`, {
                method: "DELETE",
            });
            await updateAllTables();

        } catch (e) {
            console.log(e);
        }
    }

    function renderDialogGenre(i, genre, title, tableName) {
        return <Dialog key={i}
                       title={title}
                       update={updateInTable}
                       deleteFrom={deleteFromTable}
                       insert={insertInTable}
                       genre={genre}
                       tableName={tableName}
        />
    }

    function renderElements() {
        const dialogsGenre = genres.genres.map((genre, index) => {
            return renderDialogGenre(index, genre, 'Change', genres.tableName);
        });

        dialogsGenre.unshift(
            renderDialogGenre(dialogsGenre.length + 2,
                {
                    name: 'Add new'
                }, 'Add', genres.tableName));

        const dialogsAuthors = authors.authors.map((author, index) => {
            return renderDialogGenre(index, author, 'Change', authors.tableName);
        });

        dialogsAuthors.unshift(
            renderDialogGenre(dialogsGenre.length + 2,
                {
                    name: 'Add new'
                },
                'Add', authors.tableName));

        const dialogsCities = cities.cities.map((city, index) => {
            return renderDialogGenre(index, city, 'Change', cities.tableName);
        });

        dialogsCities.unshift(
            renderDialogGenre(dialogsCities.length + 2,
                {
                    name: 'Add new'
                },
                'Add', cities.tableName));


        return {
            dialogsGenre,
            dialogsAuthors,
            dialogsCities
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Container>
                        <h2 className={classes.crudHeader}> Genres </h2>
                        {renderElements().dialogsGenre}
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Container>
                        <h2 className={classes.crudHeader}> Authors </h2>
                        {renderElements().dialogsAuthors}
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Container>
                        <h2 className={classes.crudHeader}> Cities </h2>
                        {renderElements().dialogsCities}
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}
