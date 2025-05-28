pipeline {
  agent any

  parameters {
    booleanParam(name: 'RUN_CHECK_RESULTS', defaultValue: true, description: 'Run Check Results stage')
    booleanParam(name: 'RUN_CREATE_DIFFS', defaultValue: true, description: 'Run Create Diffs stage')
    booleanParam(name: 'RUN_APPLY_DIFFS', defaultValue: true, description: 'Run Apply Diffs stage')
    booleanParam(name: 'RUN_RUN_TESTS', defaultValue: true, description: 'Run Tests stage')
    booleanParam(name: 'RUN_SUMMARY', defaultValue: true, description: 'Run Summary stage')
  }

  environment {
    NODE_OPTIONS = '--loader tsx'
    RESULTS_DIR = 'results'
    DIFFS_DIR = 'diffs'
    TARGET_LIST = 'target_modify_tc_list.txt'
    TEST_RESULT_FILE = "${RESULTS_DIR}/test-results.json"
  }

  options {
    timestamps()
  }

  stages {
    stage('Check Results') {
      when {
        expression { params.RUN_CHECK_RESULTS }
      }
      steps {
        echo '[Check Results] Restore previous build results...'
        copyArtifacts(projectName: env.JOB_NAME, selector: specific("${env.BUILD_NUMBER.toInteger() - 1}"), filter: "${TEST_RESULT_FILE}", target: 'prev')
        copyArtifacts(projectName: env.JOB_NAME, selector: specific("${env.BUILD_NUMBER.toInteger() - 2}"), filter: "${TEST_RESULT_FILE}", target: 'prev2')

        echo '[Check Results] Compare results to find modified TCs'
        sh '''
          npx tsx scripts/compare_results.ts \
            --prev=prev/test-results.json \
            --prev2=prev2/test-results.json \
            --out=${TARGET_LIST}
        '''
      }
    }

    stage('Create Diffs (Parallel)') {
        when {
            expression { params.RUN_CREATE_DIFFS }
        }
        steps {
            script {
            def lines = readFile("${TARGET_LIST}").split("\\r?\\n").findAll { it.trim() }

            def parallelStages = [:]
            for (def line in lines) {
                def (tcName, _) = line.tokenize('|')
                parallelStages[tcName] = {
                stage("Diff: ${tcName}") {
                    echo "Creating diff for ${tcName}..."
                    sh "npx tsx create_diff.ts ${tcName}"
                }
                }
            }

            parallel parallelStages
            }
        }
        }

    stage('Apply Diffs (Serial)') {
        when {
            expression { params.RUN_APPLY_DIFFS }
        }
        steps {
            script {
            def lines = readFile("${TARGET_LIST}").split("\\r?\\n").findAll { it.trim() }

            for (def line in lines) {
                def (tcName, testFile) = line.tokenize('|')
                def patchFile = "${DIFFS_DIR}/${tcName}.diff"

                echo "Applying diff to ${testFile}"
                sh "patch ${testFile} -i ${patchFile}"
            }
            }
        }
    }

    stage('Run Tests') {
      when {
        expression { params.RUN_RUN_TESTS }
      }
      steps {
        echo '[Run Tests] Executing playwright tests...'
        sh 'npx playwright test tests/'

        echo '[Run Tests] Archiving JSON results...'
        archiveArtifacts artifacts: "${TEST_RESULT_FILE}"
      }
    }

    stage('Summary') {
      when {
        expression { params.RUN_SUMMARY }
      }
      steps {
        echo '[Summary] Generating summary page...'

        sh '''
          mkdir -p summary
          cp ${TARGET_LIST} summary/
          cp ${DIFFS_DIR}/*.diff summary/
        '''

        publishHTML(target: [
          reportDir: 'summary',
          reportFiles: "${TARGET_LIST},*.diff",
          reportName: 'AI 수정 요약 결과',
          keepAll: true
        ])
      }
    }
  }
}