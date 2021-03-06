import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { indigo, red } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  normal: {
    padding: theme.spacing(1),
    backgroundColor: indigo[700],
    color: "#fff",
    textAlign: 'center',
    minWidth: 40,
  },
  soldOut: {
    padding: theme.spacing(1),
    backgroundColor: red[500],
    color: "#fff"
  },
  title: {
    fontSize: 13,
    fontWeight: 700
  },
  content: {
    fontSize: 11
  }
}))

const ShopOverlay = ({
  code, // 판매기관코드
  name, // 판매기관명
  type, // 판매처 유형 (약국: 01, 우체국: 02, 농협: 03)
  addr, // 주소
  tel, // 연락처
  stock_d, // 입고일
  stock_t, // 입고시간
  stock_cnt, // 입고수량
  sold_cnt, // 판매수량
  remain_cnt, // 잔고수량
  sold_out, // 완판여부
  lat, // 위도
  lng
}) => {
  const classes = useStyles()

  const Tooltip = () => (
    <div>
      <Typography className={classes.title}>{name}</Typography>
      <Typography className={classes.content} component="p">
        남은 수량: {remain_cnt}
      </Typography>
      <Typography className={classes.content} component="p">
        {tel}
      </Typography>
      <Typography className={classes.content} component="p">
        {addr}
      </Typography>
    </div>
  )

  return (
    <div
      data-shop-code={code}
      className={classes.container}
      data-tippy-content={renderToStaticMarkup(<Tooltip />)}
    >
      {!sold_out && (
        <Card className={classes.normal}>
          <Typography className={classes.title}>{remain_cnt}개</Typography>
        </Card>
      )}
      {sold_out && (
        <Card className={classes.soldOut}>
          <Typography className={classes.title}>품절</Typography>
        </Card>
      )}
    </div>
  )
}

export default ShopOverlay
