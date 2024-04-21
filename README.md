# 💛 amberflag-server

## API

the url is https://amberflag-server.onrender.com/

you will have to send in the body your key and token and it will return the environments activated for every featureflag of a project as:

```
{
    "data": {
        "button-red-dashboard": [
            "testing1",
            "testing2",
            "testing3",
            "test9",
            "dev",
            "test1"
        ],
        "icon-redesign": [
            "testing2",
            "dev"
        ],
        "new-top-bar": [
            "testing3",
            "dev",
            "test9"
        ],
        "text-example": [
            "env"
        ]
    }
}
```
