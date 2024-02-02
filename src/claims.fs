namespace EDS.Server

open System.Security.Claims
open Microsoft.AspNetCore.Authentication.JwtBearer

module AuthConfig =
    let [<Literal>] scheme    = JwtBearerDefaults.AuthenticationScheme
    let [<Literal>] authority = "localhost:5000"
    let [<Literal>] issuer    = "eds"
    let [<Literal>] audience  = "user"

module Claims =
    let userClaims id name =
        let id = string id
        [ Claim (ClaimTypes.Name          , name, AuthConfig.issuer)
          Claim (ClaimTypes.NameIdentifier, id  , AuthConfig.issuer) ]

    let userIdentity id name =
        ClaimsIdentity (userClaims id name, AuthConfig.scheme)

    let userPrincipal (userId: ClaimsIdentity) =
        ClaimsPrincipal userId
