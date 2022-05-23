import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/system/Box';

function Error({ statusCode }: any) {
    return (
        <Box sx={{ padding: '20px' }}>
            {statusCode ? (
                <Box>
                    <Alert sx={{ borderRadius: '10px' }} severity='error'>
                        <AlertTitle>Error {statusCode}</AlertTitle>
                        An error occurred on Server — <strong>Contact Admin</strong>
                    </Alert>
                </Box>
            ) : (
                <Box>
                    <Alert sx={{ borderRadius: '10px' }} severity='error'>
                        <AlertTitle>Error {statusCode}</AlertTitle>
                        An error occurred on Client — <strong>Contact Admin</strong>
                    </Alert>
                </Box>
            )}
        </Box>
    );
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
