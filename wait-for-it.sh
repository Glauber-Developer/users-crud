#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available

TIMEOUT=15
QUIET=0
EXIT_CODE=0

usage()
{
    echo "Usage: $0 host:port [-t timeout] [-- command args]"
    exit 1
}

wait_for()
{
    for i in `seq $TIMEOUT` ; do
        nc -z "$HOST" "$PORT" > /dev/null 2>&1
        result=$?
        if [ $result -eq 0 ] ; then
            if [ $QUIET -eq 0 ] ; then
                echo "$HOST:$PORT is available after $i seconds"
            fi
            return 0
        fi
        sleep 1
    done
    echo "$HOST:$PORT is not available after $TIMEOUT seconds"
    return 1
}

while [ $# -gt 0 ]
do
    case "$1" in
        *:* )
        HOST=$(echo $1 | cut -d : -f 1)
        PORT=$(echo $1 | cut -d : -f 2)
        shift 1
        ;;
        -q)
        QUIET=1
        shift 1
        ;;
        -t)
        TIMEOUT=$2
        if [ "$TIMEOUT" = "" ] ; then
            break
        fi
        shift 2
        ;;
        --)
        shift
        break
        ;;
        *)
        usage
        ;;
    esac
done

if [ "$HOST" = "" -o "$PORT" = "" ] ; then
    usage
fi

wait_for
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ] ; then
    exit $EXIT_CODE
fi

exec "$@"
