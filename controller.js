app.controller('homeController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
    // $scope.$on('$routeChangeSuccess', function () {
    //     try {
    //         $scope.successHideStatus = true;
    //         $scope.failureHideStatus = true;
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //     }
    // });

    $rootScope.studentModel = {}
    $rootScope.studentModel.currentId = "";
    $rootScope.studentModel.studentArr = {};

    $rootScope.studentModel.sample = {
        name: "John Doe",
        email: "jd@gmail.com",
        age: null,
        rollNo: null,
        isMale: null,
        date: null
    }

    $rootScope.studentModel.current = {
        name: "John Doe",
        email: "jd@gmail.com",
        age: null,
        rollNo: null,
        isMale: null,
        date: null
    }

    $scope.dispAllStud = function () {
        req = {
            method: 'GET',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: null,
        }
        $http(req).success(function (response) {
            $rootScope.studentModel.studentArr = response;
            $rootScope.totalStud = response.length;
            console.log(response)
            console.log("Success Displayed All Students")
            $scope.successHideStatus = false;
        });
    }

    $scope.delete = function (student) {
        $scope.studentModel.studentArr.splice($scope.studentModel.studentArr.indexOf(student), 1);

        req = {
            method: 'DELETE',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/' + student.id,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: null,
        }
        $http(req).success(function (response) {
            console.log(response)
            $scope.successHideStatus = false;
            console.log("Deleted Student Successfully...")
        });
    }

    $scope.loadId = function (student) {
        $rootScope.studentModel.currentId = student.id;
    }

    $scope.resetForm = function () {
        $rootScope.studentModel.current = {
            name: "John Doe",
            email: "jd@gmail.com",
            age: null,
            rollNo: null,
            isMale: null,
            date: null
        }
    }

}]).controller('addController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    // $scope.$on('$routeChangeSuccess', function () {
    //     try {
    //         $scope.successHideStatus = true;
    //         $scope.failureHideStatus = true;
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //     }
    // });

    $scope.submitForm = function () {
        console.log("Posting data....");
        formData = $rootScope.studentModel.current;
        console.log(formData);
        req = {
            method: 'POST',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: formData
        }
        $http(req).success(function (response) {
            $rootScope.studentModel.current = $rootScope.studentModel.sample
            $rootScope.studentModel.currentId = response
            console.log(response)
            $scope.successHideStatus = false;
            console.log("Successfully Form Submitted")
        });
    }
}]).controller('editController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.$on('$routeChangeSuccess', function () {
        try {
            // $scope.successHideStatus = true;
            // $scope.failureHideStatus = true;
            if ($rootScope.studentModel.currentId != "") {
                $scope.getStudent();
            }
        }
        catch (err) {
            console.log(err.message)
        }
    });

    $scope.update = function () {
        req = {
            method: 'PUT',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/' + $rootScope.studentModel.currentId,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: $rootScope.studentModel.current,
        }
        $http(req).success(function (response) {
            $rootScope.studentModel.current = $rootScope.studentModel.sample
            console.log(response)
            console.log("Updated Student Successfully....")
            $scope.successHideStatus = false
        });
    }

    $scope.getStudent = function () {
        req = {
            method: 'GET',
            url: 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/' + $rootScope.studentModel.currentId,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: null,
        }
        $http(req).success(function (response) {
            console.log(response)
            var temp = {
                name: response[0].name,
                email: response[0].email,
                age: response[0].age,
                rollNo: response[0].rollNo,
                isMale: response[0].isMale,
                date: new Date(response[0].date)
            }
            $rootScope.studentModel.current = temp;
            console.log("Successfully Got Current Student....")
        });
    }

}]).filter("gender", function () {
    return function (gender) {
        switch (gender) {
            case true:
                return "Male";
            case false:
                return "Female";
        }
    }
});
