@echo First, copying objects.txt to 2-exported folder.
@pause
@copy objects.txt 2-exported
@echo Now, converting all pictures, views and logics to 3-converted folder
@pause
@AgiConvert.exe 2-exported 3-converted -p -v -l -j -o
@echo Finished.
@pause