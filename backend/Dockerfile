# ---------- BUILD STAGE ----------
FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o yiaga-backend


# ---------- RUNTIME STAGE ----------
FROM gcr.io/distroless/base-debian12

WORKDIR /app

COPY --from=builder /app/yiaga-backend .

EXPOSE 8080

CMD ["./yiaga-backend"]
