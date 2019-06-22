## Geotech's Grid-Reporting project

Required Config in **.env** for SQL Server connection:
***
```
DB_CONNECTION_SECOND=sqlsrv
DB_HOST_SECOND=DESKTOP-MGPV9VB
DB_PORT_SECOND=1433
DB_DATABASE_SECOND=CO2
DB_USERNAME_SECOND=sa
DB_PASSWORD_SECOND=peter
```
Required Config in **config/database.php** for SQL Server connection:
***
```
'c02' => 
[
    'driver'    => env('DB_CONNECTION_SECOND','sqlsrv'),
    'host'      => env('DB_HOST_SECOND'),
    'port'      => env('DB_PORT_SECOND'),
    'database'  => env('DB_DATABASE_SECOND'),
    'username'  => env('DB_USERNAME_SECOND'),
    'password'  => env('DB_PASSWORD_SECOND'),
    'charset' => 'utf8',
    'prefix' => '',
],
```


Required PHP extension:
***
1. If you are using PHP 7.1,
[download the extension here](https://github.com/Microsoft/msphpsql/releases/download/v4.2.0-preview/Windows-7.1.zip
) 
2. Copy the two to ext dir (Menu > PHP > dir:ext), then go to Menu > PHP > Extensions and click to the dll names to enable them. (for laragon)