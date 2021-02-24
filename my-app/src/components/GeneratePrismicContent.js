import React from 'react';
import Loader from 'react-loader-spinner';
import Selector from './Select'
import Selectormulti from './MultiSelect'

const GeneratePrismicContent = ({ 
        disabled, 
        getPrismicContent, 
        setRepo,
        setAction, 
        setLocaleTo, 
        setLocaleFrom, 
        providers, 
        setSelectedProviders, 
        setSelectedCustomType,
        isDisabledProvidersSelect,
        validate,
        show,        
    }) => {   
    
    const optionsPrismicRepos = [
        //{ value: 'dev', label: 'https://fanduel-casino-dev.prismic.io/api/v2' },
        //{ value: 'prod', label: 'https://fanduel-casino.prismic.io/api/v2' },

        { value: 'fanduel_dev', label: 'Fanduel Casino Dev' },
        { value: 'fanduel_prod', label: 'Fanduel Casino Prod' },
      ];

      const optionasCustomTypes = [
        { value: 'product', label: 'Product' },
        { value: 'navigation', label: 'Navigation' },
        { value: 'categories', label: 'Categories' },
        { value: 'homepage', label: 'Homepage' },
        { value: 'zones', label: 'Zones' },
        { value: 'games', label: 'Games' },
      ]
      
      const optionsLocales = [
        { value: 'en-df', label: 'English - Default' },
        { value: 'en-gb', label: 'English - Great Britain' },
        { value: 'en-us', label: 'English - United States' },
        { value: 'fd-mi', label: 'Fanduel - MI' },
        { value: 'fd-pa', label: 'Fanduel - PA' },
        { value: 'sd-nj', label: 'Startdust - NJ' },
        { value: 'sd-pa', label: 'Startdust - PA' },       
        { value: 'fq-mi', label: 'Fanduel QA - MI' },
        { value: 'fq-pa', label: 'Fanduel QA - PA' },
        { value: 'sq-nj', label: 'Stardust QA - NJ' },
        { value: 'sq-pa', label: 'Stardust QA - PA' },
      ]; 

      const optionsActions = [
        { value: 'generate', label: 'Generate >> from Source to Target Locale' },
        { value: 'update', label: 'Update >> to Source Locale' },
      ];           

    const handleRepoSelection =  (repo) => {        
        setRepo(repo)
    }

    const handleActionSelection =  (action) => {        
        setAction(action)
    }

    const handleLocaleSelectionFrom =  (localeFrom) => {
        setLocaleFrom(localeFrom)
    }

    const handleLocaleSelectionTo =  (localeTo) => {
        setLocaleTo(localeTo)
    }

    const handleProvidersSelection =  (providers) => {
        setSelectedProviders(providers)
    }

    const handleCustomTypeSelection =  (customType) => {
        setSelectedCustomType(customType)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Duplicate Prismic Content</h2>
                <form>                   

                    {show.repo && (
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">Prismic Repo {validate.repo == false && <span class="mandatory-error">(*)</span> } </label>
                                <Selector 
                                    type="repo" 
                                    options={optionsPrismicRepos}
                                    handleRepoSelection={handleRepoSelection}
                                >
                                </Selector>
                            </div>                        
                        </div>
                    )}
                    
                    {show.action && (
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">Action {validate.action == false && <span class="mandatory-error">(*)</span> } </label>
                                <Selector 
                                    type="repo" 
                                    options={optionsActions}
                                    handleRepoSelection={handleActionSelection}
                                >
                                </Selector>
                            </div>                        
                        </div>
                    )}

                    {show.customType && (
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">Custom Type {validate.customType == false && <span class="mandatory-error">(*)</span> } </label>
                                <Selector 
                                    type="repo" 
                                    options={optionasCustomTypes}
                                    handleRepoSelection={handleCustomTypeSelection}
                                >
                                </Selector>
                            </div>
                        </div>
                    )}

                    {show.fromLocale && (
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">Source Locale {validate.fromLocale == false && <span class="mandatory-error">(*)</span> } </label>
                                <Selector
                                    type="localeFrom"  
                                    options={optionsLocales}
                                    handleLocaleSelectionFrom={handleLocaleSelectionFrom}
                                >
                                </Selector>
                            </div>
                        </div>
                    )}

                    {show.toLocale && (
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">Target Locale {validate.toLocale == false && <span class="mandatory-error">(*)</span> } </label>
                                <Selector
                                    type="localeTo" 
                                    options={optionsLocales}
                                    handleLocaleSelectionTo={handleLocaleSelectionTo}
                                >
                                </Selector>
                            </div>
                        </div>
                    )}

                    {show.providers && (
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="exampleInputEmail1">Providers</label>
                                <Selectormulti
                                    providers={providers}
                                    handleProvidersSelection={handleProvidersSelection}
                                    isDisabled={isDisabledProvidersSelect}
                                >
                                </Selectormulti>
                            </div>
                        </div>
                    )}

                    {!disabled && 
                    <div>
                        <button type="button" disabled={disabled} onClick= {(e) => getPrismicContent()} className="btn btn-danger">Go</button>
                   
                    <br />
                    <br />
                    <span class="mandatory-error">(*) Mandatory</span>
                    </div>
                    } 
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}                       
                        visible={disabled}
                  />

                </form>
                </div>
            </div>
        </div>
    )
}

export default GeneratePrismicContent