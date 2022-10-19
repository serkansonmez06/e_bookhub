import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import "../App/App.css";
const SearchComponent = () => {
  const [data, setData] = useState({
    id: "",
    title: "",
    pageCount: "",
    language: "",
    publisher: "",
    authors: "",
    description: "",
    previewLink: "",
    imageLinks: "",
    thumbnail: "",
    smallThumbnail: "",
    saleInfo: "",
  });

  const [bookData, setBookData] = useState([]);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const modalPerPage = 9;
  const pagesVisited = pageNumber * modalPerPage;

  const pageCount = Math.ceil(bookData.length / modalPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleModal = (
    id,
    title,
    authors,
    language,
    publisher,
    pageCount,
    description,
    previewLink,
    imageLinks,
    thumbnail,
    smallThumbnail,
    saleInfo
  ) => {
    setData({
      id,
      title,
      authors,
      language,
      publisher,
      pageCount,
      description,
      previewLink,
      imageLinks,
      thumbnail,
      smallThumbnail,
      saleInfo,
    });
    console.log(saleInfo);
  };
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setQuery(keyword);
    if (keyword === "") {
      window.location.reload();
    }
  };
  const handleSubmit = async () => {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${process.env.REACT_APP_GOOGLE_APIS_KEY}`
      )
      .then((response) => {
        setBookData(response.data.items);
        console.log(response.data.items);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleSubmit();
  }, [setBookData]);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5d4a4",
        marginTop: "-50px",
      }}
    >
      <div
        className="input-group"
        style={{
          width: "70%",
          marginRight: "auto",
          marginLeft: "auto",
          padding: "90px",
          marginBottom: "5px",
        }}
        data-toggle="tooltip"
        title="Search any book"
      >
        <input
          type="text"
          className="form-control rounded"
          placeholder="&#xF002; Search any book"
          aria-label="Search"
          aria-describedby="search-addon"
          style={{ fontFamily: "Arial,FontAwesome" }}
          onChange={(e) => handleSearch(e)}
          value={query}
          name="keyword"
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {bookData.length === 0 ? (
        ""
      ) : (
        <div>
          {loading ? (
            <div>
              <div>
                <div
                  style={{
                    marginLeft: "100px",
                    padding: "30px",
                    marginTop: "-90px",
                  }}
                >
                  <div className="row mt-5 ml-5 ">
                    {bookData
                      .slice(pagesVisited, pagesVisited + modalPerPage)
                      .map((item, key) => (
                        <div
                          key={key}
                          className="col-sm-3 m-1 d-flex justify-space-between"
                          style={{ marginLeft: "50px", width: "30%" }}
                        >
                          <div
                            className="card "
                            style={{ width: "100%", height: "87%" }}
                          >
                            <img
                              className="card-img-top"
                              src={
                                item.volumeInfo.imageLinks
                                  ? item.volumeInfo.imageLinks.thumbnail
                                  : "data:image/jpeg;base64,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"
                              }
                              alt="Card cap"
                              height={"60%"}
                            />
                            <hr />
                            <div className="card-body">
                              <div style={{ height: "80%", width: "100%" }}>
                                <div style={{ height: "30%" }}>
                                  <h5 className="card-title">
                                    {item.volumeInfo.title}
                                  </h5>
                                </div>
                                <div style={{ marginTop: "21%" }}>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalLong"
                                    onClick={() =>
                                      handleModal(
                                        item.id,
                                        item.volumeInfo.title,
                                        item.volumeInfo.authors,
                                        item.volumeInfo.language,
                                        item.volumeInfo.publisher,
                                        item.volumeInfo.pageCount,
                                        item.volumeInfo.description,
                                        item.volumeInfo.previewLink,
                                        item.volumeInfo.imageLinks,
                                        item.volumeInfo.imageLinks.thumbnail,
                                        item.volumeInfo.imageLinks
                                          .smallThumbnail,
                                        item.saleInfo.buyLink
                                      )
                                    }
                                  >
                                    More Info
                                  </button>
                                </div>

                                <div
                                  className="modal fade"
                                  id="exampleModalLong"
                                  tabIndex="-1"
                                  role="dialog"
                                  aria-labelledby="exampleModalLongTitle"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLongTitle"
                                        >
                                          {data.title}
                                        </h5>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                          </span>
                                        </button>
                                      </div>
                                      <div className="d-flex flex-row justify-content-center mt-2">
                                        <img
                                          src={
                                            data.imageLinks.smallThumbnail
                                              ? data.imageLinks.smallThumbnail
                                              : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQUERgVEhISGBUYFRoaHBgVGBgaFRgYGBgZGRgYGhgcIS4lHB4rIRgcJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABAIDBQYBB//EAEkQAAIBAgMEBwUEBggDCQAAAAECAAMRBBIhBQYxcRMiMkFRYZEUUoGhsQdisrM0cnOCwfAWIzM1QnSD0RWStCQlRFNUY4Si0v/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7NCEIBCEIBCEIBCEIBFamKA7Ovn3SGIrXNhw+sogTasx7z8J50je8fWRhAl0je8fUwzt7zepkYQJZ294+ph0je8fUyMIE+kb3j6wFZveMhCAzTxPvD4iMg34TNllCrlPl/OsDQhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAlVdrKZbFsYdBzgKSSKWNhIxnBjiYFtOiq92viZ61VR3iU4itrlHxi0B72hfH5GHtC+PyMRhAe9oXx+Rh7Qvj8jEYQHxWU98HphuI+MQl2HrWNjw+kCurTKm3pIxzFjq/GJwHMK91t4RiJ4M6nlHIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBFsbwHOMzO2zi0o0jUqXyLxsLnUhRYDzIgQjeD4HnMrZ2OTEUlq0ySj5rZgQeqzIwIPmpE1cHwPOAoYSVRLMRIwCEIQCEIQCEJ6oubCAzWP9WPhFY5XWyW8LROBfg+0eX8Y7EsH2jy/jHYBCEIBCEIBCEIBCEIBCEIBCEIBCEIBOe35/QKn7n5iToZz2/H6BU/c/MSBm7j/AN3Uv1q3/UVZfQ3xw6tiEcVENBgDmC9clnUCmAxJ/syTe1gRKdxx/wB3Uv1q3/UVZkbr4CnW2piTUUN0Tsyg9nM1Vxcjvtl08zfuEDTTfrDs4SrSrUlJADsFKrm0BcA3UeeoHEkDWW7X3mo0HNNVeq69oU7ZVtxBY9/K9u+H2j4ZWwquQMyVAAe/KwIYcuB+Ee3OwdKlgqTKAGq00qOx7TM6hrX8BewH8bwKtg7cpYwMKQZXS2ZHsGAN8rCxIZTY6g92tpZtra1LCgGsWzNfKii7NbifADUcTOe2bTWlt9wgsppvoOFnWk5Fv1p1m0sXhUK1sQEBW4R3UFhfUhBqSdO4Xgc22+iKQamGxKoeDWU6eNri/wALzpsHUWtTWpSIZHXMrDgQeeo5HhOc25vfgq+HqUh0jFkIW6WAe3UOuo1traM/ZzVC4DKTwrVbeAu2Y/NjA92lvLTpVDSWnVq1BoVpgGxHEE31PK9ovS36oKSGw2KDDQiyXH/3ie4GJp08RiUrsqYgsLZyAWUFs4UniQ9yQPFYbyVlqbWwowxVqiumYob6B8zAkcbU81/IwOxp7QSphVr6oj01qdfqsqsA3WHcQDrOYqb4U7noqGIqqvF0UBeeuvraXfaXi2XCqicXc3HiEUkA+WYqfhE9nbz4SjSSmlPEAIoHYW5Nusx6+pJ1Jgb27m3aOKzdGWDIBmRhZ1vwNgSCpsdQSNLcdJ0U+XbMxiPtmjUwyOqVM6uCtjY0nZrgEgDOiNfxn1GAQhCAQhCAQhCAQhCAQnhMSrVydBw+sBh66jvufKV+1/d+cVhAa9r+784e1/d+cVhAa9r+785ib5VC2z6ptYDJ+Yk2KFC+p4fWSxlGm9MpUVWRuKngbG405gGBhfZ4o/4bSPfmra//ACKsxt0KmXaWNPHrH86pOqoUUpoKdJFSmt7KugGYlieZJJ+Mpw+BpI7vTporv22A1bUnX4kn4wMrf2qWwRv76fxjm7n6Fhv8vS/AscxWFSqmSoiuhN7NwuOBluHw2VFRFARVCqALKFAsAPICBx1D+/X/AGZ/KpSne51XaGHauCcOAt9CVtmbNoOIzZCw92dsux6fSmtkQVSLF7da1gLX5KB8JbitlU6q5aqqy3vZlvY+I8D5iBzW2tuYYYZ0p1Kbs6MiJSIbVgRfq6AC8r3Dv7EbWv0tS1+F7i06DC7u4ekSadJFJBF7Emx0IuxJAPlI19l9Dhqi4VVVsjlFUW65U2I872gfNsHWw6dIm0KFZ6vSk50ZbgZVDKwLrrmDHge1Oi2FtvZtBx0StSZurnqqTof8JqXYINPEDQeUU3N2xh6FN0rMadUuczOrWddMozAG1tQVNtbnvnu920cPiKa0sOvS1WfQohvaxBQEgXvcacNLnhA2ftAwTYjCdUHMhJNuORlKsR5i4PIGMbE3twtagnT1UpVQoDq5ydcCxKE6Mp4gjuOtjpHtl0Gp4ekjtmdKVNGb3mRFVm+JBMXrbCwrtmfDoSeNrrfzOUjWBbg94MO+I6KlV6RyjN1Q2XKpW/WtY9ocJr+1/d+cX2Zs+hSH9TSpoSLHKozEeBbiRL6+H719P9oHvtf3fnD2v7vzisIDXtf3fnJpiFPlziUIGpCZ9KsV5eEeVgRcQJQhCApiqn+EfGLSdY9Y85CBKmhY6RgYQd5MtpJlW383lsBf2UeJnowy+cvkHYAXMCNSoFH0ESdyTcwdixuZGASdOkW4cPGWYehfU8PrHAIFSUFHmfOXTyUVMSBw1+kBiEQbEsfLlImq3vGBowmd0re8ZJcQR335wPcVsrD1Tmq0KTt4sgLetrwobLoIP6qlTS/eiqpPMgay1MUO8W+kvVgeEBKrQK+YlU1IpXw/evp/tAXVrG4jtGtm5xGeqxBuIDr0FJvr8JH2VfOWUamYXlkBY4UdxMXq0ivHh4zRkGUEWMDOl+Fext3H6yl1sSPCeA6wNSE8vCBnVO0eZ+siJ6/E8z9Z4IGpCEIBEcTUubDgPrGK75V8+ERgEuw9HNqeH1kKaZjaPhbCwgSiG2MUaWHqOtsy03YX1F1UkXHhHKlQKLmYW3WLYasT/wCTU/AYHJ7E3urnEImJZWp1TlVsoTLUJsmosCrHq8L5ivnO5Uaz5phtk9Pst2F89OtUItocmVC4BHeO0OXnOy3S2ucThlZz/WoejqfrqB17eDAhv3iO6AjultetiKmIWqwYIUyWVVIzGoCNOI6g46zppxW4X9vi/wDT/FWmjvFtqolVMNhQOme3WIBy3uQADpewLEnQAegdJCclV2LtBVLJj2NS18lzlv4LnBU/FQOUb3V26+JR0qALXp2uQLKytcK+U8DdWBXxHnYA1jturSxdPDGmxNQLZwRZcxcC44nsfObSOV4T5rtPB4hcbRSpiA1dsmSoBYLdny36vcQ3ceM7DYmDxVNnOJxIqqwTIAoGQjPnN8ove66fd84HT0qwbn4S2ZamxuI/Qq5h598CnE0f8Q+P+8WmpM+tTyt5HhA8ovla/d3zQmZHMLUuLeH0gMQhCBnVe0eZkJOr2jzMhAfzT2V3hAUfieZng4z1+J5meDjA1IQhASxbXa3h/GUSTtck+ciBAbwqWF/H6RmRVbC0hXayn0gKV6mY+Q4TN21+i1v2L/gMeiu1KTPh6iILs1N1A0FyVIAudOMDB3A/RH/bv+FJmUh/w/aijhh8QVU+ChmPRn9xzk/Ve83dzcBUo4ZkqoUc1XYC6k5SFAPVJ8DH96Nge0YbKgHSocyX0B95b9wI+YEDnvs6phsRi793RfirT3BAf0hcPbsPlv73R07W/czfCPbg7Gr4Z65r0ygcUgt2UklOkLdkn3xJ717uVqldMVhGAroQbXAJKggMC2h6pKkHQiB1xpL7o9J8+3Zp5tr4rJ2ctXlfpkt9G+cdfae13XIMGiORYuNAPNQzkD1M1d093/ZEYuwatUILMOAC3yoCdSBmY3PEsfKBze8SkbYwoP8A7f46s7Oc9vpsPEVK9LE4YZnp5erpcFHLKbEjMDmIIve3ya2JicZUZ/aqFOkgVcgW+Yt18+a7HS2W2g4njA15Ok+U3/m0hCBpgyrEJdfMayOFe628PpGIGXLMO1mHnpI1FsxHnIwNSEihuAfKSgZ1XtHmZXLKvaPMyuA7CeQgKvxPMzwcZ6/E8zPBA1JBzYHlJyut2DygZ8nQF2EhLcL2/hAfimMbgI3EsZ2hygUQhCBfhFub+Edi+EHV+MYgEIQgEIQgEVxi8D8I1KcSOof574CMIQgX4RutzEdmfhu2P57poQEcWOtzEpjGM4jlF4D+H7IlsowvZ+Jl8DOq9o8zK5ZV7R5mVwHIQhAVfieZngnr8TzM8EDUldYdU8pZIkXFvKBmyobSoU6qo9akrtYBC6hiW0UBSb6nQSwm3E2A4k93iZ8u2hRfFpisUCQq1EVbcQCNORQGkf3jA+zRLGDrDlKN3Np+04SlW0zMnWA4B1JSovwdWHwlWN2thxXXDmqorHghuCeqXsDaxNgTa8C2EIphtpUalR6dOorOl86i91scp1IsddNIGrhG0I8/rGpztfeDDUGtUrKDwKqGdhzVAbfGObM2/hsQxWjWVnAvkIKvbxysASNePCA3j8dToIXquFUEC5vxPAADUmSw2MSpTFWmwdGXMGXUEeUQ3ko4dsOfamK0wynML3DXstrA+NuHfLNk0qKYNBhjej0d0a5N1YFs1z43v8YFO7u8FPGq7UqdVOjYIRUCAklQwIyswtYzanB/ZZ/ZYj9sv5STqdpbaw+H0rVkVrXy6s1vHItzbztA04ltPErTou7AlUUsQtsxCgsQLkC9h4xHAbz4Ou4p066524K4ZGY8bKGAubAmw8IbzPfC1x4UKnrkaAvsbaqYml0tNairnZcrhQwKmx7LMLfGPzkNzsdSo4AtVqKi9PUtfiTcaADU/ATe2ftzD4hslKqrPa+QhlcgcSFYAkeYgNY7aC4em1Z1dlS11XLmOYhRbMQOJ8Y5snaK4iglZFdVdbgPYMNSLHKSL6dxMw97F/7BWPlT/MSObkf3bh/1D+JoGnjDqOUXi22NsUKDWq1VU20XVnt45VBNvOUbP21h8Q2WlWVntfIbq9hxIRgCRrxEDdwvZ+Jl8roiyjlLIGdV7R5mQk6vaPMyEBmEIQF24nnPBPX4nmZ4IGpCEIHJ7640UMK+ti/UHJgS5/5Q0jsHZATZ60aikGojF/ENVBJHNQQP3RMje8+17Qp4QHqqCGI1tmXOxI77KFHMxj+hw/8AWYj1P/6gQ+zjFNTqYjB1D1lfpFB59HVUeQZVb/UM8+0jDNTeji6Y6yMAbd7Ic6D4gOp8jMnF4c7N2hh6vSO6E9d2tco5yVA3jluj/uifQt5Nn9PhKlMC7Fbr+svWX1It8YCWI2ii4U4lCCnRh0PcwZQU9br6zD3BwhFJ67atVewJ4lEJF/i5c+ek5ldqO+zqeES/SdOUW/ApcGiOWZwv+nPo1CgKGHCUxcU6dlB4tkXS/mbfOBnDZWBw92qdCCxJz4h01JN9M9gPgJy+2mw6Y7C1sG9InpkzdEylQTUWm3Z7OZHZSPCX7n4Kni2rVcTepVWoFszHslFYOQO4lmUDgOjNpVvRRw6YvDpQVFYVqecJ3E1qeUHztfSB2G//AOgP+un4xLt0/wC6sN/lU/LEzt9HPsLi+mdPxiNbqV7bMwwt/wCFp/gEDJ+yz+yxH7Zfykm3idiYKnUfEYjIS7XJrsuRdALANYd3fczA+zKrlpYjTjWX8pIjs+mmN2lX9qJY082SmWI6odkIAGtlAW4HEuCfMK9/BgmpK+DqYfpFa59nZDawLI9kOhVlFj5zrNqOWwVVjxbDOTzNMmcpv5hMNSoBKaU0qkkkLfNkyNqfAXtOox/93v8A5VvyjA5vcvYtKrTNaqM9nZFRuwLWzMR3kk8OHx4Q342WtBUxOGUU3V9MosodQXRgBw7LAjgQbeN29wNpU+jbDFstUO7hW0zo1tUP+K1rEcRp3EGefaFigaaUKfWqM+bIvG+Uoi82L6Dygbu81QPsl3Xg6UnHJnQj5Ge7sYrotj06h1yUHe3jlLm3ynu9GH6PZLU+OSnST/ldF/hFtiIX2MlNe09B1HMlwPnA57dmthnNSvjatE1mcgLVZdAACXyt4kkDwCi0p3wbDBUr4KpRFdHuOiZdCFZlcqvddcp8Q9jGdyqWHqo9KtTpmujkgOBnamQtiL8bNmU+Gl+InUPsfAoC1alhkXhdwqqSdALtA38JWD00cCwZVa3hmANvnL5WigAAAAAWAGgAHAASyBnVe0eZkJOr2jzMhAZhCEBd+J5meCSqdo8z9ZEQNSEIQMPB7t0aeJqYgM7VHDDrkFVzsGbKAB3gDkLRhhY2M1Ipiqf+IfH/AHgYm29i0sWgSrmsCbFCAesLMNQdD/ATdwYApqoLHKoW7G7HKLXJ7ybRSSpOVN4Gbh90MOmJGIBqZg7OFJXIGbN3WvYZtBfSwmrWpFTccI4rAi4kiIHFYnc/Du5dDUpk30psANeNrgkDy4Sf9EsNZABUBRw+YMMzsrKwzkjhdRoLd/jOoq4bvX0i5BHGAntPAJiKRp1CwViDdSAeqQRxB8JPAYRKNFKKZsiIqDMbtlUWFyBxjEIGbsXY9PCq60zUId8xzkE3ChRawGlgIrtTdfD136Q9Ij3uWQgXPDNYg2PmLTchA55tz8MaTIekJe13LDpNL6AkWA18NdPCbVXCq9I0jfIyGmbHrZSuXj42l4l9LDk6toPDvgc2dy8M9JaZFTqE2qXXP1mLWPVsbE6aaR3ZG5+Hw7ioM7uvZLkWU+IUAC/mbzolUAWEC1hcwEtr4FK9BqVQsEa1ypAbqsGFrg94ER2fg1oUkpUyxRFsMxBa1ydSAPGO16uY+UrgYe1N1sPiHzsrI5NyyEC58SCCL+YtJYbcLCgg1DVqfddhl8bHKASPjOhwtO5ueA+sdgEIQgZ1XtHmZCTq9o8zIQG7QlmSewE8QtmPnrK49iKeYacREYDmHq3FjxHzjEy5Ytdh3wNCEQ9pbxHpPVxLd9oHlellNxw+kqmipDDxETrUCuo4fSBCnUKnSO06oPDj4RCAMDUkGQHiAYtTxJHa1+svWsp7/WBA4Ze64kfZPvfKNQgKeyfe+UkMKO8kxmECCoBwAk5W1VRxIlD4r3R8TAYdwo1iVaqW5eEgzE6meQCTpUyx8u+FKkW5eMeACjwAgehbCwkok+JN9OEj7S3l6QH5VWqhR5xQ4hvGVkwCSprdgPORjeGpW1PE/SAzCEIBF61DNqND8jGIQM10I4iRmnI9Gvuj0EDOhNDol90ekOiX3R6QEabkG4j1OoGH8IdEvuj0EAgHAD0gU1cN3r6RZlI0ImnIMgPEQM6EafCjuPrKWoMO6/KBAMRwJkhWb3jIEW4wgT6ZveMizk8SZ5ACAQk1ose710l6YXxPpAVAvwjNLDd7ekYVAOAk4EGYKIjVqlj5eEeZAeIB5zzol90eggZ8JodEvuj0h0S+6PSBnz1VJ4C80OjX3R6CSAgLUcPbU+kahCAQhCAQhCAQhCAQhCAQhCAQhCATyEIAYu0IQPBGE4QhA9nsIQCEIQCEIQCEIQCEIQCEIQCEIQP/2Q=="
                                          }
                                          alt="smallIMg"
                                        />

                                        <div
                                          style={{
                                            marginTop: "30px",
                                            marginLeft: "30px",
                                          }}
                                          className="text-left"
                                        >
                                          <span style={{ fontWeight: "bold" }}>
                                            Author: &nbsp;
                                          </span>
                                          {data.authors} <br />
                                          <span style={{ fontWeight: "bold" }}>
                                            Language: &nbsp;
                                          </span>
                                          <span className="text-uppercase">
                                            {data.language}
                                          </span>
                                          <br />
                                          <span style={{ fontWeight: "bold" }}>
                                            Publisher: &nbsp;
                                          </span>
                                          {data.publisher}
                                          <br />
                                          <span style={{ fontWeight: "bold" }}>
                                            Page Count: &nbsp;
                                          </span>
                                          {data.pageCount}
                                        </div>
                                      </div>
                                      <div className="modal-body text-justify">
                                        {data.description}
                                        <br />

                                        <br />
                                      </div>
                                      <div className="mb-3">
                                        <a
                                          href={data.previewLink}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="btn btn-primary"
                                        >
                                          Preview
                                        </a>
                                      </div>

                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        {data.saleInfo === undefined ? (
                                          <a
                                            href={data.saleInfo}
                                            rel="noreferrer"
                                            className="btn btn-primary "
                                          >
                                            Not Available
                                          </a>
                                        ) : (
                                          <a
                                            href={data.saleInfo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-primary "
                                          >
                                            Buy
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {bookData.length === 0 ? (
                ""
              ) : (
                <div className="d-flex justify-content-center ">
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    pageClassName="page-item"
                    containerClassName={"pagination"}
                    previousClassName="page-item"
                    nextClassName="page-item"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    disabledClassName={"paginationDisabled"}
                    onPageChange={changePage}
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className="spinner-border d-flex justfiy-content-center"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
