import { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import SelectBrand from 'components/SelectBrand';
import SelectCategory from 'components/SelectCategory';
import AddFormHeader from 'components/AddFormHeader';
import RichEditor from 'components/RichEditor';
import DatePicker from 'components/DatePicker';
import SelectImage from 'components/SelectImage';
import PaperWraper from 'components/PaperWraper';
import Input from 'components/shared/Input';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// constants
import { SPACING_HALF } from 'constants/spacing';

// hooks
import { useCreateProduct } from 'hooks/product';

const useStyles = makeStyles((theme: Theme) => ({
  inputsSection: {
    width: '100%',
    margin: theme.spacing(SPACING_HALF, '0'),
  },
  specialOffers: {
    width: '100%',
    marginTop: theme.spacing(SPACING_HALF),
  },
  specificsSection: {
    margin: theme.spacing(SPACING_HALF, '0'),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

/**
 * @component AddProduct
 */
function AddProduct() {
  const classes = useStyles();

  // formData
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [remainingNumber, setRemainingNumber] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string>('');

  // checkBoxState
  const [state, setState] = useState({
    specialOffer: false,
    question: false,
    comments: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const formData = { title, price, remainingNumber, category, brand };

  const createProduct = useCreateProduct(formData);

  return (
    <Container maxWidth="xl">
      {/* Start Form Header */}
      <form>
        <AddFormHeader
          title="???????????? ??????????"
          onSubmit={() => createProduct.mutate(formData as any)}
          isLoading={createProduct.isLoading}
        />
        {/* End of Form Header */}

        {/*Start of General information */}
        <PaperWraper title="?????????????? ??????">
          <div className={classes.inputsSection}>
            <Grid container spacing={SPACING_HALF}>
              <Grid item xs={12} md={6}>
                <Input
                  size="small"
                  placeholder="?????? ??????????"
                  type="text"
                  value={title}
                  onChange={(text) => setTitle(text as string)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectBrand value={brand} setValue={setBrand} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={SPACING_HALF}>
                  <Grid item xs={12} md={6}>
                    <Input
                      size="small"
                      value={price}
                      onChange={(num) => setPrice(Number(num))}
                      placeholder="????????"
                      endAdornment={
                        <Typography variant="overline" color="textSecondary">
                          ????????
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={SPACING_HALF}>
                  <Grid item xs={12} md={6}>
                    <Input
                      size="small"
                      value={remainingNumber}
                      onChange={(num) => setRemainingNumber(Number(num))}
                      placeholder="??????????"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={SPACING_HALF}>
                  <Grid item xs={12} md={6}>
                    <SelectCategory value={category} setValue={setCategory} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </PaperWraper>
        {/* end of General information */}
        {/* start of Special Offer  */}
        <PaperWraper title="?????????????? ????????">
          <div className={classes.inputsSection}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={state.specialOffer}
                  onChange={handleChange}
                  name="specialOffer"
                />
              }
              label="?????????????? ????????"
            />
            <Fade unmountOnExit appear={false} in={state.specialOffer}>
              <div className={classes.specialOffers}>
                <Grid container spacing={SPACING_HALF} style={{ width: '100%' }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <DatePicker label="???????????? ??????????" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}></Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Input
                      size="small"
                      placeholder="???????? ??????????"
                      endAdornment={<Typography color="textSecondary">%</Typography>}
                    />
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </div>
        </PaperWraper>
        {/* end of Special Offer  */}

        {/* start of Product Image  */}
        <PaperWraper title="???????????? ??????????">
          <SelectImage />
        </PaperWraper>
        {/* end of Product Image  */}

        {/* start of Review */}
        <PaperWraper title="?????? ?? ??????????">
          <div className={classes.inputsSection}>
            <RichEditor placeholder="?????? ?????????? ???? ?????? ????????..." />
          </div>
        </PaperWraper>
        {/* end of Review */}

        {/* start of EnabelComments */}
        <PaperWraper title="?????????? ??????????????">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="primary"
                checked={state.comments}
                onChange={handleChange}
                name="comments"
              />
            }
            label="???????? ???????? ?????? ??????????"
          />
        </PaperWraper>
        {/* end of EnabelComments */}

        {/* start of Enable Question&Answers */}
        <PaperWraper title="???????? ?? ????????">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="primary"
                checked={state.question}
                onChange={handleChange}
                name="question"
              />
            }
            label="???????? ???????? ?????? ???????? ?? ???????? "
          />
        </PaperWraper>
        {/* end of Enable Question&Answers */}
        <PaperWraper title="????????????">
          <div className={classes.specificsSection}>
            <Grid container spacing={SPACING_HALF}>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="caption">
                  ???????????? ??????
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="??????????" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="?????????????? ?????? ????????" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="??????" />
              </Grid>
            </Grid>
          </div>
          <div className={classes.specificsSection}>
            <Grid container spacing={SPACING_HALF}>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="caption">
                  ??????????
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="?????????? ??????????" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="???????????????? ???? ???????? ?????????? ??????????" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="???????????????? ???? ???????? ?????????? ??????????" />
              </Grid>
            </Grid>
          </div>
        </PaperWraper>
      </form>
    </Container>
  );
}
export default AddProduct;
