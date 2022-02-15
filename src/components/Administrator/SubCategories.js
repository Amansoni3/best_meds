import React, { useState, useEffect } from 'react';
import { styled, makeStyles } from "@mui/styles"
import { Grid, TextField, Button } from "@mui/material"
import { flexbox, fontSize, padding } from "@mui/system"
import Avatar from "@mui/material/Avatar"
import { ServerURL, postData, postDataAndImage, getData } from "./FetchNodeServices";
import Swal from "sweetalert2";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },
    subdiv: {
        display: 'flex',
        background: '#55efc4',
        padding: 20,
        width: 600
    },
    inputClasses: {
        display: 'none'
    },

}))

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#ffffff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#2d3436',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#2d3436',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderColor: '#2d3436',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});

export default function SubCategory(props) {

    const classes = useStyles()

    const [subCategoryIcon, setSubCategoryIcon] = useState({ byte: '', file: '/uploadicon.png' })

    const [subCategoryName, setSubCategoryName] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [description, setDescription] = useState('')
    const [categories , setCategories] = useState('')
    const [listCategories , setListCategories] = useState([])


    
    const handleCategoriesChange = (event) => {
        setCategories(event.target.value);
    };



    const handleIconChange = (event) => {
        if (event.target.value.length) {
            setSubCategoryIcon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const fetchAllCategories = async() => {

        var result = await getData('subcategory/fetchallcategories')
        setListCategories(result.result)
    }

    const fillCategories=()=>{

        return(listCategories.map((item)=>{
           return(<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem> )
        }))
     }

     useEffect(function(){

        fetchAllCategories()
        

     },[])

    const handleSubmit = async () => {

        var formData = new FormData()

        formData.append('subcategoryname', subCategoryName)
        formData.append('icon', subCategoryIcon.byte)
        formData.append('categoryid', categories)
        formData.append('description', description)


        var result = await postDataAndImage("subcategory/addsubcategories", formData)

        if (result.result) {

            Swal.fire({
                icon: 'success',
                title: 'Best Meds',
                text: 'Sub Categories Added',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth: 150,
                imageAlt: 'Custom image'

            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Best Meds',
                text: 'Failed',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth: 150,
                imageAlt: 'Custom image'
            })
        }


    }


    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <div style={{ padding: 5, fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: 'center' }}>
                            <img src="categories.png" height={40} width={40} style={{ padding: 5 }} />
                            Sub Category Interface
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categories}
                                label="Categories"
                                onChange={handleCategoriesChange}
                                
                            >
                                {fillCategories()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <CssTextField variant='outlined' onChange={(event) => setSubCategoryName(event.target.value)} label='Sub Category Name' sx={{ input: { color: '#fff' } }} fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <CssTextField variant='outlined' onChange={(event) => setDescription(event.target.value)} label='Description' sx={{ input: { color: '#fff' } }} fullWidth />
                    </Grid>


                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <label htmlFor="contained-button-file" fullWidth>

                            <input accept="image/*" onChange={(event) => handleIconChange(event)} id="contained-button-file" className={classes.inputClasses} multiple type="file" />

                            <Button variant="contained" component="span" style={{ backgroundColor: '#57606f' }} >
                                Upload Sub Category Icon
                            </Button>

                        </label>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            alt="Upload Image"
                            src={subCategoryIcon.file}
                            sx={{ width: 100, height: 100 }}
                            variant="square"

                        />
                    </Grid>

                    <Grid item xs={6}>

                        <Button variant="contained" onClick={() => handleSubmit()} style={{ backgroundColor: '#2c2c54' }} color="success" fullWidth component="span">
                            Save Details
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={() => window.location.reload(false)} variant="contained" type="reset" fullWidth component="span" style={{ backgroundColor: '#2c2c54' }}>
                            Reset All
                        </Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )



}