namespace Server

open Shared

module Services =
    let student: Services.Student = {
        getUser =
            async {
                return 1
            }
    }
