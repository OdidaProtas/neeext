import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
import { Button, CircularProgress, Grid, textFieldClasses } from '@mui/material';
import axios from 'axios';


function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };


    const query = useRouter().query;

    const { q, page, limit } = query;

    React.useEffect(() => {
        if (q && page && limit) {
            setLoading(true)
            axios.get(`https://api.africasokoni.co.ke/api/v1/products?q=${q}&page=${page}&limit=${limit}&status_id=1`).then(({ data }: any) => {
                setProducts(data.results)
                setLoading(false)
            }).catch((e: any) => {
                setLoading(false)
            })
        }
    }, [q, page, limit])


    const baseImag = (images: any) => {
        const imageArray = images?.split(/,/);

        return imageArray?.[0] || "";
    };

    const download = (e, namee) => {
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(name, "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (loading) {
        return (
            <Box sx={{ width: '100%', minHeight: "100vh", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", bgcolor: "#A76D60" }}>
                <Box>
                    <CircularProgress />
                    <Typography>Fetching products</Typography>
                </Box>
            </Box>
        )
    }



    return (
        <Box sx={{ width: '100%', minHeight: "100vh", overflow: "hidden", bgcolor: "#A76D60" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Product Card Image" {...a11yProps(0)} />
                    <Tab label="Banner Image" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container>
                    {products.map((p: any) => {
                        const baseImage = baseImag(p.images)
                        const sale_price = p?.sku[0]?.discount_price
                            ? p?.sku[0]?.discount_price
                            : p?.price ?? 0
                        const category = p.categories[0]?.child_category?.images;
                        const price = p.price ?? 0;

                        const discount = price - sale_price

                        return (
                            <Grid key={p.id} item xs={4} >
                                <img width={220} height={400}
                                    src={`/api/product?img=${baseImage}&name=${p.name}&sale_price=${sale_price}&category=${category}&price=${price}&discount=${discount}`}
                                    alt="" />
                                <br />
                                <a
                                    href={`/api/product?img=${baseImage}&name=${p.name}&sale_price=${sale_price}&category=${category}&price=${price}&discount=${discount}`}
                                    onClick={e => download(e, p.name)}
                                    style={{ margin: "3px", marginBottom: "6px" }}
                                >
                                    download
                                </a>
                            </Grid>
                        )
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container>
                    {products.map((p: any) => {
                        const baseImage = baseImag(p.images)
                        const sale_price = p?.sku[0]?.discount_price
                            ? p?.sku[0]?.discount_price
                            : p?.price ?? 0
                        const category = p.categories[0]?.child_category?.images;
                        const categoryName = p.categories[0]?.child_category?.name;

                        const price = p.price ?? 0;

                        const discount = price - sale_price

                        return (
                            <Grid key={p.id} item xs={12} >
                                <img width={1080} height={720} src={`/api/banner?img=${baseImage}&name=${p.name}&sale_price=${sale_price}&category=${category}&price=${price}&discount=${discount}&category_name=${categoryName}`} alt="" />
                                <br />
                                <a
                                    href={`/api/product?img=${baseImage}&name=${p.name}&sale_price=${sale_price}&category=${category}&price=${price}&discount=${discount}`}
                                    onClick={e => download(e, p.name)}
                                    style={{ margin: "3px", marginBottom: "6px" }}
                                >
                                    download
                                </a>
                            </Grid>
                        )
                    })}
                </Grid>            </TabPanel>
        </Box>
    );
}
